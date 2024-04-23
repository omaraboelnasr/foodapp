import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate()
    const handleLogOut = ()=>{
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <div>
            <h1>Sidebar</h1>
            <button onClick={handleLogOut} className="btn btn-danger">Log Out</button>
        </div>
    );
}

export default Sidebar;
