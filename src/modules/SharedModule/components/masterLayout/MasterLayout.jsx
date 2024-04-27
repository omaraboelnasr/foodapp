import { Outlet } from "react-router-dom";
import SideBar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const MasterLayout = ({loginData}) => {
    return (
        <div className="d-flex ">
                    <div>
                        <SideBar/>
                    </div>
                    <div className="w-100 ms-3 me-3 mt-4">
                        <Navbar  loginData={loginData} />
                        <div className="mt-4">
                            <Outlet/>
                        </div>
                    </div>
        </div>
    );
}

export default MasterLayout;
