import { useQuery } from "@tanstack/react-query";
import useAxisoSecure from "./useAxiosSecure";


const useAllClass = (id) => {
    const axiosSecure = useAxisoSecure();
    const {data:video=[], isLoading:classLoading, refetch:classReload} = useQuery({
        queryKey:['video',id],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/getClass/${id}`)
            return res.data
        }
    })
    return [video, classLoading, classReload]
};

export default useAllClass;