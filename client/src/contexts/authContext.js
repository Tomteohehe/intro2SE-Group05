import { createContext, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const authContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    const loginUser = async User => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', User)
            if (response.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }
            return response.data
        }
        catch(error){
            if (error.response.data) {
                return error.response.data
            }
            else return {success: false, message: error.message}
        }
    }

    //context data
    const authContextData = { loginUser }

    // return provider
    return (
        <authContext.Provider value = {authContextData}> 
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider