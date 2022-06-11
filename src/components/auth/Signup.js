import {useState} from 'react'
import FormAction from './FormAction';
import {sFields} from './formFields'
import FormWrapper from './FormWrapper';
import Input from './Input';
import {CreateAccount} from "../../lib/fetch";
import {useNavigate} from "react-router-dom";
import Notification from "../Notification";

const signupFields = sFields;
let fieldsState = {};

signupFields.forEach(field => fieldsState[field.id] = '');

function Signup() {
   const navigate = useNavigate()
   const [signupState, setSignupState] = useState(fieldsState);
   const [isLoading, setIsLoading] = useState(false);
   const [notification, setNotification] = useState({
      isActive: false,
      message: '',
      code: null
   })

   const handleChange = (e) => setSignupState({...signupState, [e.target.id]: e.target.value});

   const handleSubmit = async (e) => {
      e.preventDefault();
      const {username, password, email} = signupState
      const bodyObj = JSON.stringify({
         user_name: username,
         user_password: password,
         user_email: email
      })
      const data = await CreateAccount(bodyObj, setIsLoading, setNotification, navigate)
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
                  text={isLoading ? 'Sending...' : 'Signup'}
                  handleSubmit={handleSubmit}
               />
            </form>
         </FormWrapper>
      </>
   )
}

export default Signup