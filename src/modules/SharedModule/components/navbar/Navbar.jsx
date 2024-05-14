import { useContext } from 'react';
import ProfileImg from '../../../../assets/images/avatar.png'
import { AuthContext } from '../../../../context/AuthContext';


const Navbar = () => {
    let {loginData}=useContext(AuthContext)

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navBorder">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item me-5">
                            <a className="nav-link"> <img src={loginData?.profileImage||ProfileImg} className='pe-2'/> hello {loginData?.userName} </a>
                        </li>
                    </ul>
                </div>
            </div>
    </nav>
    );
}

export default Navbar;
