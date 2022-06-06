import { useState } from 'react'
import FormAction from './FormAction';
import { sFields } from './formFields'
import FormWrapper from './FormWrapper';
import Input from './Input';
import {useNavigate} from "react-router-dom";

const signupFields = sFields;
let fieldsState = {};

signupFields.forEach(field => fieldsState[field.id] = '');
function Signup() {
    const navigate = useNavigate()
    const [signupState, setSignupState] = useState(fieldsState);
    const [isLoading,setIsLoading]=useState(false)

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signupState)
        createAccount()
    }

    const createAccount = () => {
        const {username,password,email}= signupState
        const baseUrl = 'http://localhost:8080/api/v1/users/signup';
        const bodyObj = JSON.stringify({
            user_name:username,
            user_password:password,
            user_email:email
        })
        setIsLoading(true)
        fetch(baseUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:bodyObj
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            setIsLoading(false);
            navigate('/login',{replace:true})
        }).catch(e=>console.log(e))
    }
    return (
        <FormWrapper>
            <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
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
                    text={isLoading?'Sending...':'Signup'}
                    handleSubmit={handleSubmit}
                />
            </form>
        </FormWrapper>
    )
}

export default Signup