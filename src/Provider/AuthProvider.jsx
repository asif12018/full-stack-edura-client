import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from './../firebase/firebase.config';
import useAxiosPublic from './../Hooks/useAxiosPublic';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const googleProiver = new GoogleAuthProvider();
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
    //google sign in
     const googleSignIn = () =>{
        return signInWithPopup(auth, googleProiver)
     }

    //observer
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
             setLoading(false);
             setUser(user);
             const userInfo = {email: user.email}
             axiosPublic.post('/jwt', userInfo)
             .then(res =>{
                if(res.data){
                    localStorage.setItem('access-token', res.data)
                }
             }).catch(err =>{
                console.log(err)
             })
          // ...
        } else {
            setLoading(false);
            setUser(null)

            //remove token
            localStorage.removeItem('access-token');
        }
      });

       return () =>{
        unsubscribe();
       }
    },[axiosPublic])

    const userInfo = {userCreate, userSignIn, userSignOut, updateUser, user, setUser, googleSignIn, loading}

    return (
        <>
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;