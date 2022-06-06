import React from 'react'

function Home() {
   const token = window.localStorage.getItem('_token')

   const handleClick = (e) => {
      e.preventDefault()
      const baseUrl = 'http://localhost:8080/api/v1/users/all';

      fetch(baseUrl, {
         method: 'GET',
         headers: {
            "Content-Type": "application/json"
         },
         body: token
      }).then(res => res.json()).then(data => console.log(data)).catch(e => console.log(e))
   }
   return (
      <>

         <div>Home page</div>
         <button onClick={handleClick}>
            Get all users
         </button>
      </>
   )
}

export default Home