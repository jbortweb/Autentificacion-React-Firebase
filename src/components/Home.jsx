import {useAuth} from '../context/AuthContext';

const Home = () => {

  /* En user guardamos el objeto del usuario y podemos acceder a sus datos */
  const {user,logout,loading} = useAuth();
  console.log(user);


  const handleLogout = async () => {
     await logout();
  };

  if(loading) return <h1>Cargando...</h1>
  

  return (
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-xl mb-4">Hello {user.displayName || user.email}</p>
      </div>
      <button 
        onClick={handleLogout}
        className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
      >
        Logout
      </button>
    </div>
  )
}

export default Home