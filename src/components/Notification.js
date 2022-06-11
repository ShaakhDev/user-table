import React from 'react';

function Notification({code, message,setNotification}) {
   const isError = code > 399;

   const handleClose = () => {
      setNotification({
         code: null,
         message: null,
         isActive: false,
      })
   }

   return (
      <>
         <div
            className="bg-white border border-gray-200 border-solid p-8 py-15 shadow-sm shadow-gray-200 rounded-lg  flex  items-start p-3   absolute top-8  animate-fade-in right-8 min-w-[30%]">
            { !isError &&
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>}
            { isError &&
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>}
            <div className="ml-3">
               <p className="text-lg">{isError?'Something went wrong!':'Success!'}</p>
               <p className="text-sm text-gray-500">{message}</p>
            </div>
            <button onClick={handleClose} type="button"
                    className="ml-auto -mx-1.5 -my-1.5  text-gray-500 rounded-lg  p-1.5 hover:bg-gray-200 inline-flex h-8 w-8  ">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"/>
               </svg>
            </button>
         </div>
      </>
   );
}

export default Notification;
