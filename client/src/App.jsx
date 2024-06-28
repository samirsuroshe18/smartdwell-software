import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/login_component/login_component';
import SignUp from "./Components/signup_component/signup_component";
import UserDetails from "./Components/userDetails/userDetails";
import Analysis from './Components/graphs/Analysis';

const App = () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <Router>
      
      <main>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/userDetails" /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/home"
            element={
              isLoggedIn ? <Home /> : <Navigate to="/sign-up" />
            }
          />
          <Route path="/home/analysis" element={<Analysis />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<Login />} />
          <Route
            path="/userDetails"
            element={
              isLoggedIn ? <UserDetails /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
