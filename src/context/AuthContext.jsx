import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null)

export function AuthContextProvider(props) {
    let requestHeader = { Authorization: `Bearer ${localStorage.getItem('token')}`}
    let baseUrl = 'https://upskilling-egypt.com:3006/api/v1'
    let [loginData, setLoginData] = useState(null)
    let saveLoginData = () => {
        let encodedToken = localStorage.getItem('token')
        let decodedToken = jwtDecode(encodedToken)
        setLoginData(decodedToken)
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            saveLoginData()
        }
    }, [])
    return (
        <AuthContext.Provider value={{baseUrl,requestHeader,loginData,saveLoginData}}>
            {props.children}
        </AuthContext.Provider>
    )
}