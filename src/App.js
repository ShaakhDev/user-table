import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import LoginPage from './pages/LoginPage'
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";

function App() {
   const isAuthenticated = !!window.localStorage.getItem('_token');
   return (
      <Router>
         <Routes>
            <Route path="/" element={
               <PrivateRoute isAuth={isAuthenticated}>
                  <HomePage/>
               </PrivateRoute>
            }/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
         </Routes>
      </Router>

   );
}

export default App;
