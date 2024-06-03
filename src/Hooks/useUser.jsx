import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";




const useUser = () => {

    const axiosPublic = useAxiosPublic()
    //data from context api
    const {user} = useContext(AuthContext)
    const {data:userData={}, isLoading, refetch:reloadUser} = useQuery({
        queryKey:[user?.email,'user'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/user/${user.email}`)
            // console.log(res.data)
            return res.data
        },
        enabled: !!user?.email
    })
    return [userData, isLoading, reloadUser]
};

export default useUser;