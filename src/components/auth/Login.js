import { useState } from 'react'
import { lFields } from './formFields';
import Input from './Input';
import FormAction from './FormAction';
import FormWrapper from './FormWrapper';
import {useNavigate} from 'react-router-dom';
const loginFields = lFields;
let fieldsState = {};
loginFields.forEach(field => fieldsState[field.id] = '');

function Login() {
    const navigate = useNavigate()
    const [loginState, setLoginState] = useState(fieldsState);
    const [isLoading,setIsloading]=useState(false)

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = () => {
        // API call
        const {username,email,password}=loginState;
        const baseUrl = 'http://localhost:8080/api/v1/users/login';
        const bodyObj =JSON.stringify({
            user_name:username,
            user_password:password,
            user_email:email
        })
        setIsloading(true)
        fetch(baseUrl,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:bodyObj
        }).then(res=>res.json()).then(data=>{
            const token = data?.data?.token;
            window.localStorage.setItem('_token',token)
            setIsloading(false);
            navigate('/',{replace:true});
        }).catch(e=>console.log(e))
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
                    text={isLoading?'Sending...':'Login'}
                    handleSubmit={handleSubmit}
                />
            </form>
        </FormWrapper>
    )
}

export default Login