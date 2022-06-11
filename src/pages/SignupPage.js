import React from 'react'
import Header from '../components/auth/Header'
import Signup from '../components/auth/Signup'
import Container from "../components/auth/Container";


function SignupPage() {
    return (
        <Container>
            <Header
                heading="Signup to create an account"
                paragraph="Already have an account ? "
                linkName="Login"
                linkUrl="/login"
            />

            <Signup />
        </Container>
    )
}

export default SignupPage