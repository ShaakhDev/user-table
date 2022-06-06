import React from 'react'

function FormWrapper({ children }) {
    return (
        <div className='border border-gray-200 border-solid p-8 py-15 shadow-lg shadow-gray-200 rounded-lg '>
            {children}
        </div>
    )
}

export default FormWrapper