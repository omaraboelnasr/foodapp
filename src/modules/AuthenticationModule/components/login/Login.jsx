import { useForm } from 'react-hook-form';
import logo from '../../../../assets/images/logo.png'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { ToastContext } from '../../../../context/ToastContext';
  
const Login = () => {
    const {getToastValue}=useContext(ToastContext)
    const {baseUrl,saveLoginData}=useContext(AuthContext)
    const navigate = useNavigate()
    let {register,handleSubmit,formState:{errors}}= useForm()
    const [showPassword,setShowPassword]=useState(false)
    const handleShowPassword=()=>{
        setShowPassword(!showPassword)
    }
    const onSubmit = async (data)=>{
        try{
            let response = await axios.post(`${baseUrl}/Users/Login`,data)
            getToastValue('success','Login success')
                localStorage.setItem("token", response.data.token);
                saveLoginData()
                navigate('/dashboard')
        }catch(error){
            getToastValue('error',error.response.data.message)
        }
    }
    return (
        <>
        <div className="auth-container">
            <div className="container-fluid vh-100 bg-overlay">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-md-6 bg-white p-4 pb-5 rounded-4 ">
                        <div className='text-center'>
                            <img src={logo} alt="" className='w-50' />
                        </div>
                        <div className='form-content mx-3'>
                            <h3>Log In</h3>
                            <p className='text-muted'>Welcome Back! Please enter your details</p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                                <input type="text" className="form-control" placeholder="Enter your E-mail" {...register("email" ,{
                                    required:"Email is required",
                                    pattern:{
                                        value:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                        message:'Invalid mail'
                                    }
                                })} />
                            </div>
                            {errors.email && <p className='alert alert-danger'>{errors.email.message}</p>}
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                                <input type={showPassword?'text':'password'} className="form-control z-0" placeholder="Enter your Password" {...register("password" ,{
                                    required:"Password is required",
                                })}/>
                                <div className='position-absolute end-0 px-2 py-2'>
                                <span onClick={handleShowPassword}>{showPassword?<i className="fa-regular fa-eye"></i>:<i className="fa-regular fa-eye-slash"></i>}</span>
                                </div>
                            </div>
                            {errors.password && <p className='alert alert-danger'>{errors.password.message}</p>}
                            <div className='links d-flex justify-content-between my-3'>
                                <NavLink className='text-black text-decoration-none' to="/register">Register Now?</NavLink>
                                <NavLink className='text-success text-decoration-none' to="/ForgetPass">Forgot Password?</NavLink>
                            </div>
                            <button className='btn btn-success w-100'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

    );
}

export default Login;
