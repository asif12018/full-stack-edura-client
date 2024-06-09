import { useQuery } from "@tanstack/react-query";
import useAxisoSecure from "./useAxiosSecure";


const useAllTheAssignment = (id) => {
    const axiosSecure = useAxisoSecure()
    const {data:assignment=[], isLoading:assignmentLoading, refetch:assignmentRelaod} = useQuery({
        queryKey:['assignment',id],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/getAssignment/${id}`)
            return res.data
        }
    })
    return [assignment, assignmentLoading, assignmentRelaod]
};

export default useAllTheAssignment;