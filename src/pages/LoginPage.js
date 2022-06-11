import React from 'react'
import Header from '../components/auth/Header'
import Login from '../components/auth/Login'
import Container from "../components/auth/Container";

function LoginPage() {
    return (
        <Container>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
            />
            <Login />
        </Container>
    )
}

export default LoginPage