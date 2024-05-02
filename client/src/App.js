import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Logo from "./components/Logo";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useContext } from "react";
import AuthContext from "./context/ContextApi";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import EditEmployee from "./components/EditEmployee";

const App = () => {
  const context = useContext(AuthContext);
  const isLoggedIn = context.state.authToken;

  return (
    <div className=" min-h-screen">
      <BrowserRouter>
        <Logo />
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/create_employee"
            element={isLoggedIn ? <CreateEmployee /> : <Navigate to="/login" />}
          />
          <Route
            path="/employee_list"
            element={isLoggedIn ? <EmployeeList /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit_employee/:id"
            element={isLoggedIn ? <EditEmployee /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
