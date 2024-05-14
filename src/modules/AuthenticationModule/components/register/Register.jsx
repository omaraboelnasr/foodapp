import { useForm } from 'react-hook-form';
import logo from '../../../../assets/images/logo.png'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { ToastContext } from '../../../../context/ToastContext';

const Register = () => {
    const {getToastValue}=useContext(ToastContext)
    const {baseUrl}=useContext(AuthContext)
    const navigate = useNavigate()
    let { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)

    const appendToFormData = (data)=>{
        const formData = new FormData()
        formData.append('userName',data.userName)
        formData.append('email',data.email)
        formData.append('country',data.country)
        formData.append('phoneNumber',data.phoneNumber)
        formData.append('password',data.password)
        formData.append('confirmPassword',data.confirmPassword)
        
        return formData
    }
    const onSubmit = async (data) => {
        let dataFormData = appendToFormData(data)
        try {
            let response = await axios.post(`${baseUrl}/Users/Register`, dataFormData)
            getToastValue('success','You Register success go to your email to get verification code')
            navigate('/verification')
        } catch (error) {
            getToastValue('error',error.response.data.message)
        }
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleShowConfirmPassword = () => {
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
                                <h3>Register</h3>
                                <p className='text-muted'>Welcome Back! Please enter your details</p>
                                <form onSubmit={handleSubmit(onSubmit)} className=' pt-4 pb-5'>
                                    <div className="row justify-content-evenly">
                                        <div className="col-md-5">

                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-user"></i></span>
                                                <input type="text" className="form-control" placeholder="User Name" {...register("userName", {
                                                    required: "User Name is required",
                                                    maxLength: {
                                                        value:8,
                                                        message: 'The userName must be less than 8 Characters.'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z]+\d+$/g,
                                                        message: 'The userName must contain characters and end with numbers without spaces.'
                                                    }
                                                })} />
                                            </div>
                                            {errors.userName && <p className='alert alert-danger'>{errors.userName.message}</p>}

                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-globe"></i></span>
                                                <input type="text" className="form-control" placeholder="Country" {...register("country", {
                                                    required: "Country is required",
                                                })} />
                                            </div>
                                            {errors.country && <p className='alert alert-danger'>{errors.country.message}</p>}

                                            <div className="input-group mb-3 position-relative">
                                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                                                <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Password" {...register("password", {
                                                    required: "Password is required",
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?]).{6,}$/g,
                                                        message: 'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.'
                                                    }
                                                })} />
                                                <div className='position-absolute end-0 px-2 py-2'>
                                                    <span onClick={handleShowPassword}>{showPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</span>
                                                </div>
                                            </div>
                                            {errors.password && <p className='alert alert-danger'>{errors.password.message}</p>}

                                        </div>
                                        <div className="col-md-5">
                                            <div className="input-group pb-3">
                                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                                                <input type="text" className="form-control" placeholder="Enter your E-mail" {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                                        message: 'Invalid mail'
                                                    }
                                                })} />
                                            </div>
                                            {errors.email && <p className='alert alert-danger'>{errors.email.message}</p>}

                                            <div className="input-group pb-3">
                                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-mobile"></i></span>
                                                <input type="text" className="form-control" placeholder="Phone Number" {...register("phoneNumber", {
                                                    required: "Phone Number is required",
                                                    pattern: {
                                                        value: /^\d{11}$/g,
                                                        message: 'Invalid Phone Number'
                                                    }
                                                })} />
                                            </div>
                                            {errors.phoneNumber && <p className='alert alert-danger'>{errors.phoneNumber.message}</p>}

                                            <div className="input-group mb-3 position-relative">
                                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                                                <input type={showConfirmPassword ? 'text' : 'password'} className="form-control" placeholder="Confirm Password" {...register("confirmPassword", {
                                                    required: "Confirm Password is required",
                                                    validate: (value) =>
                                                        value === watch("password") ||
                                                        "Passwords do not match",
                                                })} />
                                                <div className='position-absolute end-0 px-2 py-2'>
                                                    <span onClick={handleShowConfirmPassword}>{showConfirmPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</span>
                                                </div>
                                            </div>
                                            {errors.confirmPassword && <p className='alert alert-danger'>{errors.confirmPassword.message}</p>}
                                        </div>
                                    </div>
                                    <div className='links d-flex justify-content-end my-3'>
                                        <NavLink className='text-success text-decoration-none me-5' to="/login">Login?</NavLink>
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <button className='btn btn-success px-5 py-2 mt-4 fs-5'>Register</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
