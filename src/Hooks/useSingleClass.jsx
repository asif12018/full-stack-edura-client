
import { useQuery } from '@tanstack/react-query';
import useAxisoSecure from './useAxiosSecure';

const useSingleClass = (id) => {
    const axiosSecure = useAxisoSecure();
    const {data:classVideo={}, isLoading:classVideoLoading, refetch:classVideoReload} = useQuery({
        queryKey:['classVideo',id],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/getSingleClass/${id}`)
            return res.data;
        }
    })
    return [classVideo, classVideoLoading, classVideoReload]
};

export default useSingleClass;