import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import SideBarLogo from '../../../../assets/images/3.png'

import { useContext, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import ChangePass from "../../../AuthenticationModule/components/changePass/changePass";
import { AuthContext } from "../../../../context/AuthContext";

const SideBar = () => {
    let {loginData}=useContext(AuthContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true);
    const navigate = useNavigate()
    const [collaps, setCollaps] = useState(false)
    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    const handleCollaps = () => {
        setCollaps(!collaps)
    }

    
    return (
        <>
            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <ChangePass/>
                </Modal.Body>
            </Modal>
            <div className="sideBar-container position-sticky top-0">
                <Sidebar collapsed={collaps}>
                    <Menu className="mt-5">
                        <div className={!collaps ? 'asideLogoNotCollaps' : 'asideLogoCollaps'}>
                            <MenuItem icon={<img src={SideBarLogo} alt="" />} onClick={handleCollaps} className="sideBarLogo"> </MenuItem>
                        </div>
                        <MenuItem className="mt-5" icon={<i className="fa fa-house"></i>} component={<Link to="/dashboard" />} > Home </MenuItem>
                        {loginData?.userGroup==='SuperAdmin'?
                        <MenuItem icon={<i className="fa fa-user-group"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>:''
                         }
                        <MenuItem icon={<i className="fa fa-table-cells-large"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>

                        {loginData?.userGroup==='SystemUser'?
                        <MenuItem icon={<i className="fa fa-layer-group"></i>} component={<Link to="/dashboard/favorite" />}> Favorites </MenuItem>:''
                         }

                        {loginData?.userGroup==='SuperAdmin'?
                        <MenuItem icon={<i className="fa fa-layer-group"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>:''
                         }
                        
                        <MenuItem icon={<i className="fa fa-unlock-keyhole"></i>} onClick={handleShow}> Change Password </MenuItem>
                        <MenuItem icon={<i className="fa fa-right-from-bracket"></i>} onClick={handleLogOut}> Logout </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
        </>
    );
}

export default SideBar;
