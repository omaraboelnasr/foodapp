import { useForm } from 'react-hook-form';
import changePassLogo from '../../../../assets/images/logo.png'
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../../../../context/ToastContext';

const ChangePass = () => {
    const {getToastValue}=useContext(ToastContext)
    const {baseUrl,requestHeader}=useContext(AuthContext)
    let { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const [showOldPassword, setshowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleShowOldPassword = () => {
        setshowOldPassword(!showOldPassword)
    }

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }

    const handleShowConfirmPassword = () => {
        setshowConfirmPassword(!showConfirmPassword)
    }

    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const onSubmit = async (data) => {
        try {
            let response = await axios.put(`${baseUrl}/Users/ChangePassword`, data, {
                headers: requestHeader
            })
            getToastValue('success','Password Change Success')
            handleLogOut()
        } catch (error) {
            getToastValue('error',error.response.data.message)
        }
    }

    return (
        <>
            <div className="container-fluid">
                    <div className="text-center">
                        <img src={changePassLogo} alt="" />
                    </div>
                    <div className="mt-2 ms-2">
                        <h2>Change Your Password</h2>
                        <p className="text-muted ms-1">Enter your details below</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className=' pt-4 pb-5'>
                    <div className="input-group mb-3 position-relative">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                            <input type={showOldPassword ? 'text' : 'password'} className="form-control z-0" placeholder="Old Password" {...register("oldPassword", {
                                required: "Old Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?]).{6,}$/g,
                                    message: 'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.'
                                }
                            })} />
                            <div className='position-absolute end-0 px-2 py-2'>
                                <span onClick={handleShowOldPassword}>{showOldPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</span>
                            </div>
                        </div>
                        {errors.oldPassword && <p className='alert alert-danger'>{errors.oldPassword.message}</p>}

                        <div className="input-group mb-3 position-relative">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                            <input type={showNewPassword ? 'text' : 'password'} className="form-control z-0" placeholder="New Password" {...register("newPassword", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?]).{6,}$/g,
                                    message: 'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.'
                                }
                            })} />
                            <div className='position-absolute end-0 px-2 py-2'>
                                <span onClick={handleShowNewPassword}>{showNewPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</span>
                            </div>
                        </div>
                        {errors.newPassword && <p className='alert alert-danger'>{errors.newPassword.message}</p>}

                        <div className="input-group mb-3 position-relative">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                            <input type={showConfirmPassword ? 'text' : 'password'} className="form-control z-0" placeholder="Confirm New Password" {...register("confirmNewPassword", {
                                required: "Confirm Password is required",
                                validate: (value) =>
                                    value === watch("newPassword") ||
                                    "Passwords do not match",
                            })} />
                            <div className='position-absolute end-0 px-2 py-2'>
                                <span onClick={handleShowConfirmPassword}>{showConfirmPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</span>
                            </div>
                        </div>
                        {errors.confirmNewPassword && <p className='alert alert-danger'>{errors.confirmNewPassword.message}</p>}
                        <button className='btn btn-success w-100 mt-4'>Change Password</button>
                    </form>
                    </div>
        </>
    );
}

export default ChangePass;
