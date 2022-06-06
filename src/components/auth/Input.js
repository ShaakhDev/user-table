import React from 'react'
const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
function Input({
    type,
    placeholder,
    id,
    isRequired,
    handleChange,
    value

}) {
    return (
        <div className="mt-5">
            <input
                onChange={handleChange}
                value={value}
                id={id}
                type={type}
                required={isRequired}
                className={fixedInputClass}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input