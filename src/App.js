import Container from "./components/Container";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";

function App() {

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <PrivateRoute isAuth={true}>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

        </Routes>
      </BrowserRouter>

    </Container>
  );
}

export default App;
