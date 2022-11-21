import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div className="bg-slate-300 h-screen text-white flex">
      <AuthProvider>
        <Routes>
          <Route path="/" element={
          <ProtectedRoutes>
             <Home />
          </ProtectedRoutes>
          }></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
