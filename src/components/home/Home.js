import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GetAllUsers } from "../../lib/fetch";
import Toolbar from "./Toolbar";
import Table from "./Table";

function Home(props) {
   const navigate = useNavigate()
   const [fetched, setFetched] = useState(true)
   const [users, setUsers] = useState([]);
   const currentUser = window.localStorage.getItem('_uid')
   const [checkedIds, setCheckedIds] = useState([])

   useEffect(() => {
      if (fetched) {
         (async () => {
            const data = await GetAllUsers(navigate)
            setUsers(data?.users);
            setFetched(false)
         })()
      }
   }, [fetched])

   return (
      <>
         <Toolbar setFetched={setFetched} checkedIds={checkedIds} currentUser={currentUser} />
         <Table callback={(i) => setCheckedIds(i)} data={users} />
      </>
   )
}

export default Home;