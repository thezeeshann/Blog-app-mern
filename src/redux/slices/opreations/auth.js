import {setToken} from "../authSlice"
import {toast} from "react-toastify"

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        localStorage.removeItem("token")
        toast.success("Logged Out")
        navigate("/")
    }
}