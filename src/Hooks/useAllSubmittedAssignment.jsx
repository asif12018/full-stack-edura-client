
import { useQuery } from '@tanstack/react-query';
import useAxisoSecure, { axiosSecure } from './useAxiosSecure';

const useAllSubmittedAssignment = (id) => {
    const axiosSecure = useAxisoSecure();
    const {data:submitted=[], isLoading:isSubmitting, refetch:reloadSubmitting} = useQuery({
        queryKey:['submitAssignment',id],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/getSubmittedAssignment/${id}`)
            return res.data
        }
    })
    return [submitted, isSubmitting, reloadSubmitting]
};

export default useAllSubmittedAssignment;