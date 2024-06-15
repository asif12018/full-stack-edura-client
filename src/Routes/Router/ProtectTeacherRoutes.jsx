import { useContext, useEffect } from "react";
import useUser from "../../Hooks/useUser";
import { BounceLoader } from 'react-spinners';
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const ProtectTeacherRoutes = ({children}) => {
    // data from context API
    const { user , userSignOut, setUser, loading} = useContext(AuthContext);
    // data from hook
    const [userData, isLoading, reloadUser] = useUser();
    
    useEffect(() => {
        if (!loading && !isLoading && (!user || (userData.role !== 'admin' && userData.role !== 'teacher'))) {
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
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>;
    }

    if (user && (userData.role === 'admin' || userData.role === 'teacher')) {
        return children;
    }

    return <Navigate to={'/login'} />;
};

export default ProtectTeacherRoutes;
