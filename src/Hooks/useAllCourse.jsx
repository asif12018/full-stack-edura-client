import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllCourse = () => {
    const axiosPublic = useAxiosPublic();
    //getting all courses
    const {data:courses=[], isLoading:courseLoading, refetch:reloadCourse} = useQuery({
        queryKey:['course'],
        queryFn:async()=>{
            const res = await axiosPublic.get('/allCourse');
            return res.data
        }
    })
    return [courses, courseLoading, reloadCourse]
};

export default useAllCourse;