import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxisoSecure from "./useAxiosSecure";


const useTeacher = () => {
    const axiosSecure = useAxisoSecure()
    //data from context api
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const {data:teacher={}, isLoading:isGetting, refetch:reloadTeacher} = useQuery({
        queryKey:['teacher', user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/teacher/${user.email}`)
            // console.log(res.data)
            return res.data
        },
        enabled: !!user?.email
    })
    return [teacher, isGetting, reloadTeacher]
};

export default useTeacher;