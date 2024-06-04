import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllUser = (keyword) => {
    const axiosPublic = useAxiosPublic();
    const {data:allUserData=[], isLoading:isAllUserLoading, refetch:isAllUserReLoading} = useQuery({
        queryKey:['alluser', keyword],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/allUser?keyword=${keyword}`)
            return res.data
        }
    })
    return [allUserData, isAllUserLoading, isAllUserReLoading]
};

export default useAllUser;