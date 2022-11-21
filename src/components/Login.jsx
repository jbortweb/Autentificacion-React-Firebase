import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Login = () => {
  const { login, loginWithGoogle, resetPassword } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState();

  /* Le pasamos el parametro target con el nombre y valor que se recojen del formulario */
  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    }); /* Cambiamos el estado, recogemos los datos del objeto y le pasamos las variables con el nombre y el valor que hemos recogido en el formulario */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("El usuario no existe");
      } else if (error.code === "auth/invalid-email") {
        setError("El nombre del correo no es valido");
      } else if (error.code === "auth/wrong-password") {
        setError("La contraseña no es valida");
      } else if (error.code === "auth/internal-error") {
        setError("Faltan datos");
      } else {
        setError(error.message);
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Por favor ingresa tu email");
    try {
      await resetPassword(user.email);
      setError("Te hemos enviado un correo con un enlace, por favor revisa tu correo");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="youremail@company.ltd"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="******"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Entrar
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#!"
            onClick={handleResetPassword}
          >
            Recuperar contraseña?
          </a>
        </div>
      </form>

      <p className="my-4 text-sm flex justify-between px-3">
        No tienes una cuenta? Registrate ahora
        <Link to="/register" className="text-blue-700 hover:text-blue-900">
          Register
        </Link>
      </p>
      <button
        onClick={handleGoogleSignin}
        className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
      >
        Entra con Google
      </button>
    </div>
  );
};

export default Login;
