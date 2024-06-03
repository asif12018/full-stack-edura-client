import axios from 'axios';


const useAxisoSecure = () => {
    const axiosSecure = axios.create({
        baseURL:"http://localhost:5000"
    })
    return axiosSecure
};

export default useAxisoSecure;