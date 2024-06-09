import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';


const useCourseDetails = (id) => {
    const axiosPublic = useAxiosPublic();
    const {data:courseDetails, isLoading:isCourseLoading, refetch:courseReload} = useQuery({
        queryKey:['courseDetails',id],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/courseDetails/${id}`)
            return res.data
        }
    })
    return [courseDetails, isCourseLoading, courseReload]
};

export default useCourseDetails;