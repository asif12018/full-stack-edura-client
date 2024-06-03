import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from './../firebase/firebase.config';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //create user with email
    const userCreate = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //sign in user
    const userSignIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //sign out user
    const userSignOut = () =>{
        setLoading(true);
        return signOut(auth)
    }
    //update user name
    const updateUser = (name, photo) =>{
        setLoading(true);
        return updateProfile(auth.currentUser,{
            displayName:name, photoURL:photo
        })
    }

    //observer
    useEffect(()=>{
       const unsubscribe = () =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                 setLoading(false);
                 setUser(user);
              
              // ...
            } else {
                setLoading(false);
                setUser(null)
            }
          });
       }

       return () =>{
        unsubscribe();
       }
    },[])

    const userInfo = {userCreate, userSignIn, userSignOut, updateUser, user, setUser}

    return (
        <>
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;