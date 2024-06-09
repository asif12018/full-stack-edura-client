import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useMyEnrollClass = () => {
    //data from context api
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {data:myEnroll=[], isLoading:enrollLoading, refetch:enrollRefetch} = useQuery({
         queryKey:['myCourse', user?.email],
         queryFn: async()=>{
            const res = await axiosPublic.get(`/myEnroll/${user.email}`)
            return res.data
         }
    })
    return [myEnroll, enrollLoading, enrollRefetch]
};

export default useMyEnrollClass;