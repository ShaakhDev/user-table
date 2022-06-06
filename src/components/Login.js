import { useState } from 'react'
import { lFields } from '../components/formFields';
import Input from '../components/Input';
import FormAction from './FormAction';
import FormWrapper from './FormWrapper';

const loginFields = lFields;
let fieldsState = {};
loginFields.forEach(field => fieldsState[field.id] = '');

function Login() {
    const [loginState, setLoginState] = useState(fieldsState)

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = () => {
        // API call
    }


    return (
        <FormWrapper>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                {
                    loginFields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            id={field.id}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
                <FormAction
                    text="Login"
                    handleSubmit={handleSubmit}
                />
            </form>
        </FormWrapper>
    )
}

export default Login