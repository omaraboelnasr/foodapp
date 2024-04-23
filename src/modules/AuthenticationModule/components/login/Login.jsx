import { useForm } from 'react-hook-form';
import logo from '../../../../assets/images/logo.png'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
const Login = ({saveLoginData}) => {
    const navigate = useNavigate()
    let {register,handleSubmit,formState:{errors}}= useForm()
    const onSubmit = async (data)=>{
        try{
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data)
            // toast.success('Login success',{hideProgressBar: true})
            localStorage.setItem("token", response.data.token);
            saveLoginData()
            navigate('/dashboard')
        }catch(error){
            toast.error(error.response.data.message)
        }
    }
    return (
        <>
        <ToastContainer />
        <div className="auth-container">
            <div className="container-fluid vh-100 bg-overlay">
                <div className="row vh-100 justify-content-center align-items-center ">
                    <div className="col-md-6 bg-white p-4 rounded-4 ">
                        <div className='text-center'>
                            <img src={logo} alt="" className='w-50' />
                        </div>
                        <div className='form-content w-75 mx-auto'>
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
                                <input type="password" className="form-control" placeholder="Enter your Password" {...register("password" ,{
                                    required:"Password is required",
                                })}/>
                            </div>
                            {errors.password && <p className='alert alert-danger'>{errors.password.message}</p>}
                            <div className='links d-flex justify-content-between my-3'>
                                <a>Register Now?</a>
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
