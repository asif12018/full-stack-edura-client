
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useSearchSuggest = () => {
    const axiosPublic = useAxiosPublic();
    const {data:allSuggestion=[], isLoading:loadingSuggestion} = useQuery({
        queryKey:['allSuggestion'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/search')
            return res.data
        }
    })
    return [allSuggestion, loadingSuggestion]
};

export default useSearchSuggest;