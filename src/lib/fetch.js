let BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('_token')
const user_name = localStorage.getItem('_uid')

export const GetAllUsers = async (navigate) => {
   const response = await fetch(BASE_URL + "/all", {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
      }
   });
   const data = await response.json()
   LogOutOnBlocked(data);
   if ( !data.ok || data.status === 500) {
      navigate('/login')
   }
   return data
}

export const CreateAccount = async (bodyObject, setIsLoading, setNotification, navigate) => {
   setIsLoading(true)
   const response = await fetch(BASE_URL + "/signup", {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: bodyObject
   });
   const data = await response.json()

   if (data.ok || data.status === 200) {
      setIsLoading(false)
     navigate('/login',{replace: true})
   } else {
      setIsLoading(false)
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
   return data
}

export const LoginToAccount = async (bodyObject, setIsLoading, setNotification, navigate) => {
   setIsLoading(true);
   const response = await fetch(BASE_URL + "/login", {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: bodyObject
   });
   const data = await response.json()
   if (data.ok && data.status === 200) {
      localStorage.setItem("_token", data?.data?.token);
      localStorage.setItem('_uid', data?.data?.user.user_name);

      setTimeout(() => {
         window.location.pathname= '/'
         // navigate('/', {replace: true})
      }, 3000);
   } else if ( !data.ok) {
      setIsLoading(false);
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
   return data
}

export const BlockUser = async (usersIds) => {
   const response = await fetch(BASE_URL + "/block", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
         user_name: user_name,
         users: usersIds
      })
   });

   const data = await response.json()
   LogOutOnBlocked(data)
   return data;
};

export const UnblockUser = async (usersIds) => {

   const response = await fetch(BASE_URL + "/unblock", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
         user_name: user_name,
         users: usersIds
      })
   })
   const data = await response.json()
   LogOutOnBlocked(data)
   return data;
}

export const DeleteUser = async (usersIds) => {
   const response = await fetch(BASE_URL + "/delete", {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
         user_name,
         users: usersIds
      })
   });
   const data = await response.json()
   LogOutOnBlocked(data)
   return data;
}

const LogOutOnBlocked = (data) => {
   if ( !data.ok || data.message === 'User is blocked!') {
      localStorage.removeItem('_token');
      localStorage.removeItem('_uid');
      window.location.reload(false)
   }
}