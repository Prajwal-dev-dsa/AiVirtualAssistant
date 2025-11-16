import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";

function App() {
  const { userData } = useContext(userDataContext);
  console.log(userData);
  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantName && userData?.assistantImage ? (
            <Home />
          ) : userData ? (
            <Navigate to="/customize" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/register"
        element={
          !userData ? (
            <Register />
          ) : userData?.assistantImage && userData?.assistantName ? (
            <Navigate to="/" />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />
      <Route
        path="/login"
        element={
          !userData ? (
            <Login />
          ) : userData?.assistantImage && userData?.assistantName ? (
            <Navigate to="/" />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />
      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
