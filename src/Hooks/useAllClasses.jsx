import { useQuery } from "@tanstack/react-query";
import useAxisoSecure, { axiosSecure } from './useAxiosSecure';


const useAllClasses = (id) => {
    const axiosSecure = useAxisoSecure()
    const {data:allClass=[], isLoading:classLoading, refetch:classReload} = useQuery({
        queryKey:['class', id],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/getAllClass/${id}`)
            return res.data;
        }
    })
    return [allClass, classLoading, classReload]
};

export default useAllClasses;