import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {BlockUser,UnblockUser,DeleteUser} from "../../lib/fetch";
import Notification from "../Notification";

function Toolbar({currentUser, checkedIds}) {
   const [notification, setNotification] = useState({
      isActive: false,
      message: '',
      code: null

   })
   const navigate = useNavigate()


   const showNotification = (data)=>{
      if(data.ok){
         setNotification({
            isActive: true,
            message: data.message,
            code: data.status
         })
         setTimeout(() => {
            setNotification({
               isActive: false,
               message: '',
               code: null
            })
         }, 3000);
      }
   }

   const blockUser = async (checkedIds)=>{
      const data = await BlockUser(checkedIds)
      showNotification(data)
   }

   const unblockUser = async (checkedIds)=>{
     const data = await UnblockUser(checkedIds);
       showNotification(data)
   };

   const deleteUser = async (checkedIds)=>{
      const data = await DeleteUser(checkedIds)
      showNotification(data)
   }
   const logOut = () => {
      localStorage.removeItem('_token');
      navigate("/login", {replace: true})
   }

   return (
      <>
         {
            notification.isActive &&
            <Notification
               setNotification={setNotification}
               message={notification.message}
               code={notification.code}
            />
         }
      <div className="toolbar text-white border-box  bg-emerald-600 xss:p-4 xss:text-sm md:text-lg md:p-8  flex justify-around">
         <h2 className="md:text-4xl xss:text-2xl">{currentUser}</h2>
         <div className="flex justify-between">

            <button
               onClick={()=>blockUser(checkedIds)}
               className="md:px-6 xss:px-2 xss:py-1 flex items-center  py-2   mr-2 bg-red-600 active:bg-red-700 text-amber-50 rounded-lg">Block
               <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
               </svg>
            </button>
            <button onClick={()=>unblockUser(checkedIds)} className="rounded-lg active:bg-gray-200 mr-2 bg-white px-2 text-green-600">
               <svg xmlns="http://www.w3.org/2000/svg" className="md:h-6 md:w-6 xss:w-5 xss:e-5 stroke-2 " fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
               </svg>
            </button>
            <button onClick={()=>deleteUser(checkedIds)} className="rounded-lg   active:bg-gray-200 mr-2 bg-white px-2 text-green-600">
               <svg xmlns="http://www.w3.org/2000/svg" className="md:h-6 md:w-6 xss:w-5 xss:e-5 stroke-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
               </svg>
            </button>
         </div>
            <button onClick={logOut} className="bg-white xss:px-1 xss:py-1.5  active:bg-gray-200 text-emerald-600 md:p-2 rounded-lg font-bold">
               Log out
            </button>
         <div className="xss:h-full">
         </div>
      </div>
      </>
   );
}

export default Toolbar;