import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import useAxisoSecure, { axiosSecure } from './useAxiosSecure';


const useTeacherAllCourse = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxisoSecure()
    //data from context api
    const {user} = useContext(AuthContext)
    const {data:teacherAllCourse=[], isLoading:teacherAllCourseLoading, refetch:teacherAllCourseReLoad} = useQuery({
        queryKey:['teacherCourse', user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/teachersAllCourse/${user?.email}`)
            return res.data
        }
    })
    return [teacherAllCourse, teacherAllCourseLoading, teacherAllCourseReLoad]
};

export default useTeacherAllCourse;