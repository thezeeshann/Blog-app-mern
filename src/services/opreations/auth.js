import {setToken,setLoading} from "../../redux/slices/authSlice"
import {toast} from "react-toastify"
import {apiConnector} from "../apiConnetor"
import { authEndpoints } from "../apis"

const {SIGNUP_API,LOGIN_API} = authEndpoints


export function signUp( firstName, lastName, email, password, confirmPassword,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading)
        try {
            const response = await apiConnector("POST",SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            })
            console.log("SIGNUP API RESPONSE............", response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading)
        try {
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password
            })
            console.log("LOGIN API RESPONSE............", response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            localStorage.setItem("token",JSON.stringify(response.data.token))
            navigate("/profile");
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        localStorage.removeItem("token")
        toast.success("Logged Out")
        navigate("/")
    }
}