import React from 'react'
import Login from '../component/auth/Login'

const Auth = ({ authRoute }) => {
  return (
    <>
        Hehge
        {authRoute === 'login' && <Login />}
    </>
  )
}

export default Auth