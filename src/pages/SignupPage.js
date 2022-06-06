import React from 'react'
import Header from '../components/auth/Header'
import Signup from '../components/auth/Signup'


function SignupPage() {
    return (
        <>
            <Header
                heading="Signup to create an account"
                paragraph="Already have an account ? "
                linkName="Login"
                linkUrl="/login"
            />

            <Signup />
        </>
    )
}

export default SignupPage