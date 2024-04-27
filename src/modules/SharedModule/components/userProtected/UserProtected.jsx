import { Navigate } from "react-router-dom";

const UserProtected = ({children}) => {
    if(!localStorage.getItem('token')){
        return children
    }else{
        return <Navigate to={'/dashboard'}/>
    }
}

export default UserProtected;
