import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import SideBarLogo from '../../../../assets/images/3.png'
import { useState } from "react";
const SideBar = () => {
    const navigate = useNavigate()
    const [collaps,setCollaps] = useState(false)
    const handleLogOut = ()=>{
        localStorage.removeItem('token')
        navigate('/')
    }
    const handleCollaps = ()=>{
        setCollaps(!collaps)
    }
    return (
        <>
        <div className="sideBar-container">
            <Sidebar collapsed={collaps}>
                <Menu className="mt-5">
                    <div className={!collaps?'asideLogoNotCollaps':'asideLogoCollaps'}>
                        <MenuItem icon={<img src={SideBarLogo} alt=""/>} onClick={handleCollaps}> </MenuItem>
                    </div>
                    <MenuItem className="mt-5" icon={<i className="fa fa-house"></i>} component={<Link to="/dashboard"/>}> Home </MenuItem>
                    <MenuItem icon={<i className="fa fa-user-group"></i>} component={<Link to="/dashboard/users"/>}> Users </MenuItem>
                    <MenuItem icon={<i className="fa fa-table-cells-large"></i>} component={<Link to="/dashboard/recipes"/>}> Recipes </MenuItem>
                    <MenuItem icon={<i className="fa fa-layer-group"></i>} component={<Link to="/dashboard/categories"/>}> Categories </MenuItem>
                    <MenuItem icon={<i className="fa fa-right-from-bracket"></i>} onClick={handleLogOut}> Logout </MenuItem>
                </Menu>
            </Sidebar>
        </div>
        </>
    );
}

export default SideBar;
