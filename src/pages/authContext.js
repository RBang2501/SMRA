// authContext.js
import React, { useState, useContext, useEffect } from "react";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
import {auth} from "./firebase"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function login(email, password) {
    console.log("Firebase Starting !")
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
      var user = userCredential.user;
    // ...
      console.log("Firebase Successfull !");
    })
    .catch((error) => {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      console.log("Nahi Hua + ", error);
    });
    // return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
