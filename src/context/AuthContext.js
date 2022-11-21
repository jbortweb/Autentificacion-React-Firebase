import { useContext, useState } from 'react';
import { createContext } from 'react';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {auth} from '../firebase';
import { useEffect } from 'react';

export const authContext = createContext();

 export const useAuth = () => {
  const context = useContext(authContext);
  if(!context) throw new Error('There is not auth provider')
  return context;
}

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const sigUp = async (email, password) => {
     await createUserWithEmailAndPassword(auth, email, password)
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  };

  const logout = () => signOut(auth);  

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  const loginWithGoogle = async() => {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleProvider)
  }

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) =>{
      setUser(currentUser);
      setLoading(false);
    })
    return () => unsubuscribe();
  },[])
  
    
  return (
    <authContext.Provider value = {{sigUp, login, user,logout, loading, loginWithGoogle, resetPassword}}>
        {children}
    </authContext.Provider>
  )
}

