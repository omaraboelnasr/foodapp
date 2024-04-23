import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AuthLayout from "./modules/SharedModule/components/authLayout/AuthLayout"
import NotFound from "./modules/SharedModule/components/notFound/NotFound"
import MasterLayout from "./modules/SharedModule/components/masterLayout/MasterLayout"
import Dashboard from "./modules/HomeModule/components/dashboard/Dashboard"
import RecipesList from "./modules/RecipesModule/components/recipesList/RecipesList"
import CategoriesList from "./modules/CategoriesModule/components/categoriesList/categoriesList"
import UsersList from "./modules/UserModule/components/usersList/usersList"
import Login from "./modules/AuthenticationModule/components/login/Login"
import Register from "./modules/AuthenticationModule/components/register/Register"
import ForgetPass from "./modules/AuthenticationModule/components/forgetPass/ForgetPass"
import ResetPass from "./modules/AuthenticationModule/components/resetPass/ResetPass"
import './App.css'
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import ProtectedRoute from "./modules/SharedModule/protectedRoute/ProtectedRoute"
function App() {
  let [loginData,setLoginData]=useState(null)
  let saveLoginData = ()=>{
    let encodedToken = localStorage.getItem('token')
    let decodedToken = jwtDecode(encodedToken)
    setLoginData(decodedToken)
    // console.log(loginData);
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      saveLoginData()
    }
  },[])
  let routes = createBrowserRouter([
    {
      path:'dashboard',
      element:<ProtectedRoute loginData={loginData}>
        <MasterLayout loginData={loginData}/>
        </ProtectedRoute>,errorElement:<NotFound/>,
      children:[
        {index:true,element:<Dashboard/>},
        {path:"recipes",element:<RecipesList/>},
        {path:"categories",element:<CategoriesList/>},
        {path:"users",element:<UsersList/>},
      ]
    },
    {
      path:'/',element:<AuthLayout/>,errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login saveLoginData={saveLoginData}/>},
        {path:"login",element:<Login saveLoginData={saveLoginData}/>},
        {path:"register",element:<Register/>},
        {path:"ForgetPass",element:<ForgetPass/>},
        {path:"ResetPass",element:<ResetPass/>},
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App