import { useQuery } from "@tanstack/react-query";
import useAxisoSecure from "./useAxiosSecure";


const useTeacherSingleCourse = (id) => {
    const axiosSecure = useAxisoSecure();
    const {data:courseDetails=[], isLoading, refetch} = useQuery({
        queryKey:['singleCourse'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/progress/${id}`)
            return res.data;
        }
    })
    return [courseDetails, isLoading, refetch]
};

export default useTeacherSingleCourse;