import { useState } from 'react'
import FormAction from './FormAction';
import { sFields } from './formFields'
import FormWrapper from './FormWrapper';
import Input from './Input';


const signupFields = sFields;
let fieldsState = {};

signupFields.forEach(field => fieldsState[field.id] = '');
function Signup() {

    const [signupState, setSignupState] = useState(fieldsState);

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signupState)
        createAccount()
    }

    const createAccount = () => {

    }
    return (
        <FormWrapper>
            <form className='mt-8 space-y-6'>
                {
                    signupFields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            id={field.id}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}

                        />

                    )
                }
                <FormAction
                    text="Signup"
                    handleSubmit={handleSubmit}
                />
            </form>
        </FormWrapper>
    )
}

export default Signup