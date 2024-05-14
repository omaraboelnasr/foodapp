import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../../../assets/images/logo.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../../context/AuthContext';
import { ToastContext } from '../../../../context/ToastContext';
  
const VerificationCode = () => {
    const {getToastValue}=useContext(ToastContext)
    const {baseUrl}=useContext(AuthContext)
    const navigate = useNavigate()
    let {register,handleSubmit,formState:{errors}}= useForm()
    const onSubmit = async (data)=>{
        try{
            let response = await axios.put(`${baseUrl}/Users/verify`,data)
            getToastValue('success','Verification success you can login now')
                navigate('/login')
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
                            <h3>Verification</h3>
                            <p className='text-muted'>Go to your email to get verification code</p>
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
                                <input type="text" className="form-control" placeholder="Enter Your Code" {...register("code" ,{
                                    required:"Code is required",
                                })}/>
                            </div>
                            {errors.code && <p className='alert alert-danger'>{errors.code.message}</p>}
                            <button className='btn btn-success w-100'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default VerificationCode;
