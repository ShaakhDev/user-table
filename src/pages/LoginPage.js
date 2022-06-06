import React from 'react'
import Header from '../components/auth/Header'
import Login from '../components/auth/Login'

function LoginPage() {
    return (
        <>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
            />

            <Login />
        </>
    )
}

export default LoginPage