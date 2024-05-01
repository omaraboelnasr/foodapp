import { useNavigate } from 'react-router-dom';
import notFoundLogo from '../../../../assets/images/logo.png';

const NotFound = () => {
    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate('/');
    };
    return (
        <div className="container-fluid notFoundContainer">
            <div style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-md-6 col-lg-4 mb-md-5 mt-md-3 text-center">
                        <img src={notFoundLogo} alt="" className="img-fluid" />
                    </div>
                </div>
                <div className="row mt-lg-5 ms-lg-5">
                    <div className="col-md-6 col-lg-4 mt-lg-5 ms-lg-5">
                            <h2 className="fs-1">Oops....</h2>
                            <h3 className="text-success">Page not found</h3>
                            <p className="fs-4">This Page doesn’t exist or was removed! We suggest you go back to home.</p>
                            <button onClick={handleBackToHome} className="btn btn-success p-3 fs-5 w-100 mt-4">
                                <i className="fa-solid fa-arrow-left me-2"></i> Back to Home
                            </button>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default NotFound;
