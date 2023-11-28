import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants";
import setAuthToken from "../utils/setAuthToken";

export const authContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    // authenticate user
    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get('http://localhost:5000/api/auth')
            if (response.data.success) {
                dispatch({type: 'SET_AUTH', payload: {isAuthenticated: true, user: response.data.user}})
            }
        }
        catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({type: 'SET_AUTH', payload: {isAuthenticated: false, user: null}})         
        }
    }

    useState(() => loadUser(), [])

    // login
    const loginUser = async User => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', User)
            if (response.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }

            await loadUser()
            return response.data
        }
        catch(error){
            if (error.response.data) {
                return error.response.data
            }
            else return {success: false, message: error.message}
        }
    }

    // register
    const registerUser = async User => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', User)
            if (response.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }

            await loadUser()
            return response.data
        }
        catch(error){
            if (error.response.data) {
                return error.response.data
            }
            else return {success: false, message: error.message}
        }
    }

    // log out
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({type: 'SET_AUTH', payload: {isAuthenticated: false, user: null}})
    }

    //context data
    const authContextData = { loginUser, authState, registerUser, logoutUser }

    // return provider
    return (
        <authContext.Provider value = {authContextData}> 
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider