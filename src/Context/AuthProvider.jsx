import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(user)

  // signup/create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  // signin/login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  // Google signin
  const popupGoogleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  // update user
  const updateUser = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData).finally(() =>
      setLoading(false)
    );
  };

  // signOut/LogOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  // reset password
  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('current User', currentUser)
      // jwt
      if(currentUser){
        const loggedUser = {email: currentUser.email}
        fetch('http://localhost:3000/getJwtToken', {
          method: 'POST',
          headers: {
            'content-type':'application/json'
          },
          body: JSON.stringify(loggedUser)
        })
        .then(res => res.json())
        .then(data => {
          console.log('token', data)
          localStorage.setItem('token', data.token)
        })
      }
      else{
        localStorage.removeItem('token')
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    setUser,
    signInUser,
    popupGoogleSignin,
    updateUser,
    logOut,
    passwordReset,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
