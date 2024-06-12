import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllAvailableCourse = () => {
    
    const axiosPublic = useAxiosPublic();
    const {data:availalbeCourse, isLoading:availableCourseLoading, refetch:availableCourseReload} = useQuery({
        queryKey:['availableCourse'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/allAvailableCourse')
            return res.data
        }
    })
    return [availalbeCourse, availableCourseLoading, availableCourseReload]
};

export default useAllAvailableCourse;