import React, { useState } from 'react';
import {useAuth} from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import Alert from './Alert';

const Register = () => {

  const {sigUp} = useAuth();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate =useNavigate();
  const [error, setError] = useState()

  /* Le pasamos el parametro target con el nombre y valor que se recojen del formulario */
  const handleChange = ({target:{name, value}}) =>{
    setUser({...user,[name]: value}) /* Cambiamos el estado, recogemos los datos del objeto y le pasamos las variables con el nombre y el valor que hemos recogido en el formulario */
  }

  const handleSubmit = async (e) => {
     e.preventDefault();
      setError('')
     try {
      await sigUp(user.email, user.password);
      navigate('/');

     }catch(error){
      
      if (error.code === 'auth/internal-error'){
        setError('Correo invalido');

      }else if(error.code === 'auth/weak-password'){
        setError('La contraseña no es valida');

      }else if(error.code === 'auth/email-already-in-use'){
        setError('Este usuario ya existe');

      }else{
      setError(error.message);
      }
     }
    };
  

  return (
    <div className="w-full max-w-xs m-auto text-black">
      {error && <Alert message={error}/>}

      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4"
      >
        <div className="mb-4">
          <label 
            htmlFor='email'
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input 
            type='text' 
            name='email' 
            placeholder='youremail@company.ltd'
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor='password'
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input 
            type='password' 
            name='password' 
            id='password'
            onChange={handleChange}
            placeholder='******'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Registrarse
        </button>
      </form>
      <p className="my-4 text-sm flex justify-between px-3">
        Ya tienes una cuenta? Accede a ella
        <Link to="/login" className="text-blue-700 hover:text-blue-900">
          Entrar
        </Link>
      </p>
    </div>
  )
}

export default Register