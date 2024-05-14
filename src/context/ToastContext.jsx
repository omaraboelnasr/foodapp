import { createContext } from "react";
import { toast } from "react-toastify";

export let ToastContext = createContext(null)
export function ToastContextProvider(props) {
    let getToastValue = (type, message) => {
        return toast[type](message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
    return (
        <ToastContext.Provider value={{getToastValue}}>
            {props.children}
        </ToastContext.Provider>
    )
}