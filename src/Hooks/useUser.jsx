import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxisoSecure, { axiosSecure } from './useAxiosSecure';



const useUser = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxisoSecure();
    //data from context api
    const {user} = useContext(AuthContext)
    const {data:userData={}, isLoading, refetch:reloadUser} = useQuery({
        queryKey:[user?.email,'user'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/${user.email}`)
            // console.log(res.data)
            return res.data
        },
        enabled: !!user?.email
    })
    return [userData, isLoading, reloadUser]
};

export default useUser;