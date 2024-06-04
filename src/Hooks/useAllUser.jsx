import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllUser = () => {
    const axiosPublic = useAxiosPublic();
    const {data:allUserData=[], isLoading:isAllUserLoading, refetch:isAllUserReLoading} = useQuery({
        queryKey:['alluser'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/allUser')
            return res.data
        }
    })
    return [allUserData, isAllUserLoading, isAllUserReLoading]
};

export default useAllUser;