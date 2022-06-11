import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ isAuth, children }) {
    return (
        <>

            {isAuth  ? children : <Navigate to="/login" replace={true} />}
        </>
    )
}

export default PrivateRoute