import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { BounceLoader } from "react-spinners";
import { Navigate } from "react-router-dom";


const PrivateRoutes = ({children}) => {
    //data from context api
    const { user , userSignOut, setUser, loading} = useContext(AuthContext)
    if(loading){
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }

    if(user){
        return children
    }
    return (
        <><Navigate to={'/login'}></Navigate></>
    );
};

export default PrivateRoutes;