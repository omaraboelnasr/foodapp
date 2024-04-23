import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import Header from "../header/header";

const MasterLayout = ({loginData}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div>
                        <Sidebar/>
                    </div>
                </div>
                <div className="col-md-9">
                    <div>
                        <Navbar  loginData={loginData} />
                        <Header/>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MasterLayout;
