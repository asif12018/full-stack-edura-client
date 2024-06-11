
import { useQuery } from '@tanstack/react-query';
import useAxisoSecure from './useAxiosSecure';

const useAllThePurchaseCourse = () => {
    const axiosSecure = useAxisoSecure();
    const {data:purchase=[], isLoading:puchaseLoading, refetch:purchaseReload} = useQuery({
        queryKey:['allPurchase'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/getAllThePurchase')
            return res.data
        }
    })
    return [purchase, puchaseLoading, purchaseReload]
};

export default useAllThePurchaseCourse;