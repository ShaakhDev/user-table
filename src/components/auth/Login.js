import {useState} from 'react'
import {lFields} from './formFields';
import Input from './Input';
import FormAction from './FormAction';
import FormWrapper from './FormWrapper';
import {useNavigate} from 'react-router-dom';
import {LoginToAccount} from "../../lib/fetch";
import Notification from "../Notification"

const loginFields = lFields;
let fieldsState = {};
loginFields.forEach(field => fieldsState[field.id] = '');

function Login() {
   const navigate = useNavigate()
   const [loginState, setLoginState] = useState(fieldsState);
   const [isLoading, setIsLoading] = useState(false);
   const [notification, setNotification] = useState({
      isActive: false,
      message: '',
      code: null
   })

   const handleChange = (e) => {
      setLoginState({...loginState, [e.target.id]: e.target.value});
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      const {username, email, password} = loginState;
      const bodyObj = JSON.stringify({
         user_name: username,
         user_password: password,
         user_email: email
      })
      const data = await LoginToAccount(bodyObj, setIsLoading, setNotification, navigate)
      console.log(data)
   }

    return (
      <>
         {
            notification.isActive &&
            <Notification
               message={notification.message}
               code={notification.code}
               setNotification={setNotification}
            />
         }
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
                  text={isLoading ? 'Sending...' : 'Login'}
                  handleSubmit={handleSubmit}
               />
            </form>
         </FormWrapper>
      </>
   )
}

export default Login