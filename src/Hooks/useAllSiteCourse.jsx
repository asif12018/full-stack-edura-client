
import { useQuery } from '@tanstack/react-query';
import useAxisoSecure from './useAxiosSecure';

const useAllSiteCourse = () => {
    const axiosSecure = useAxisoSecure();
    const {data:allSiteCourse=[], isLoading:allCourseLoading, refetch:allCourseReload} = useQuery({
        queryKey:['allCourses'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/getAllTheSiteCourse')
            return res.data;
        }
    })
    return [allSiteCourse, allCourseLoading, allCourseReload]
};

export default useAllSiteCourse;