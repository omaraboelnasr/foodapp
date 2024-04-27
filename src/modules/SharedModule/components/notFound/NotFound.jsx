import { useNavigate } from 'react-router-dom';
import notFoundLogo from '../../../../assets/images/logo.png'

const NotFound = () => {
    const navigate = useNavigate()
    const handleBackToHome = ()=>{
        navigate('/')
    }
    return (
        <>
        <div className="container-fluid notFoundContainer ">
                <div className="row">
                    <div className="col-md-2 m-5">
                        <img src={notFoundLogo} alt="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 m-5">
                        <div className='ms-5 p-5'>
                        <h2 className='fs-1'>Oops.... </h2>
                        <h3 className='text-success'>Page  not found </h3>
                        <p className='fs-4'>This Page doesn’t exist or was removed ! We suggest you  back to home.</p>
                        <button onClick={handleBackToHome} className='btn btn-success p-4 fs-5 w-100 mt-5'> <i className="fa-solid fa-arrow-left me-2"></i> Back to Home</button>
                        </div>
                        </div>
                </div>
        </div>
        </>
    );
}

export default NotFound;
