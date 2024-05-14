import { useForm } from 'react-hook-form';
import logo from '../../../../assets/images/logo.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { ToastContext } from '../../../../context/ToastContext';

const ResetPass = () => {
    const {getToastValue}=useContext(ToastContext)
    const {baseUrl}=useContext(AuthContext)
    const navigate = useNavigate()
    let {register,handleSubmit,watch,formState:{errors}}= useForm()
    const [showNewPassword,setShowNewPassword]=useState(false)
    const [showConfirmPassword,setshowConfirmPassword]=useState(false)

        const onSubmit = async (data)=>{
        try{
            let response = await axios.post(`${baseUrl}/Users/Reset`,data)
            getToastValue('success','Reset your password success')
                navigate('/login')
        }catch(error){
            getToastValue('error',error.response.data.message)
        }
    }
    const handleShowNewPassword=()=>{
        setShowNewPassword(!showNewPassword)
    }

    const handleShowConfirmPassword=()=>{
        setshowConfirmPassword(!showConfirmPassword)
    }
    return (
        <>  
        <div className="auth-container">
            <div className="container-fluid vh-100 bg-overlay">
                <div className="row vh-100 justify-content-center align-items-center ">
                    <div className="col-md-6 bg-white p-4 rounded-4 ">
                        <div className='text-center'>
                            <img src={logo} alt="" className='w-50' />
                        </div>
                        <div className='form-content mx-3'>
                            <h3>Reset Password</h3>
                            <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
                            <form onSubmit={handleSubmit(onSubmit)} className=' pt-4 pb-5'>
                            <div className="input-group pb-3">
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
                                <input type="text" className="form-control" placeholder="OTP" {...register("seed" ,{
                                    required:"otp is required",
                                })}/>
                            </div>
                            {errors.seed && <p className='alert alert-danger'>{errors.seed.message}</p>}
                            
                            <div className="input-group mb-3 position-relative">
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                                <input type={showNewPassword?'text':'password'} className="form-control z-0" placeholder="New Password" {...register("password" ,{
                                    required:"Password is required",
                                    pattern:{
                                        value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?]).{6,}$/g,
                                        message:'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.'
                                    }
                                })}/>
                                <div className='position-absolute end-0 px-2 py-2'>
                                <span onClick={handleShowNewPassword}>{showNewPassword?<i className="fa-regular fa-eye"></i>:<i className="fa-regular fa-eye-slash"></i>}</span>
                                </div>
                            </div>
                            {errors.password && <p className='alert alert-danger'>{errors.password.message}</p>}
                            
                            <div className="input-group mb-3 position-relative">
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                                <input type={showConfirmPassword?'text':'password'} className="form-control z-0" placeholder="Confirm New Password" {...register("confirmPassword" ,{
                                    required:"Confirm Password is required",
                                    validate: (value) =>
												value === watch("password") ||
												"Passwords do not match",
                                })}/>
                                <div className='position-absolute end-0 px-2 py-2'>
                                <span onClick={handleShowConfirmPassword}>{showConfirmPassword?<i className="fa-regular fa-eye"></i>:<i className="fa-regular fa-eye-slash"></i>}</span>
                                </div>
                            </div>
                            {errors.confirmPassword && <p className='alert alert-danger'>{errors.confirmPassword.message}</p>}
                            <button className='btn btn-success w-100 mt-4'>Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ResetPass;
