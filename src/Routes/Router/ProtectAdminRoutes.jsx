import { useContext, useEffect } from "react";
import useUser from "../../Hooks/useUser";
import { BounceLoader } from 'react-spinners';
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";



const ProtectAdminRoutes = ({children}) => {
    //data from contect api
    const { user , userSignOut, setUser, loading} = useContext(AuthContext)
    //data from hook
    const [userData, isLoading, reloadUser] = useUser();
    useEffect(() => {
        if (!loading && !isLoading && (!user || userData.role !== 'admin')) {
            console.log('connected');
            userSignOut()
                .then(() => {
                    // Sign-out successful.
                    setUser(null);
                })
                .catch((error) => {
                    // An error happened.
                    console.log(error);
                });
        }
    }, [loading, isLoading, user, userData, userSignOut, setUser]);
    if (loading || isLoading) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
    if(user && userData.role == 'admin'){
        return children
    }
    if(!user || !userData.role == 'admin'){
        
        console.log('connected')
        userSignOut()
            .then(() => {
                // Sign-out successful.
                setUser(null)
            }).catch((error) => {
                // An error happened.
                console.log(error)
            });
    }
    return (
        <><Navigate to={'/login'}></Navigate></>
    );
};

export default ProtectAdminRoutes;