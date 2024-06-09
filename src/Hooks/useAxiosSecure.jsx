import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/'
})
const useAxisoSecure = () => {
    const {userSignOut} = useContext(AuthContext);
    const navigate = useNavigate();
    // request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stop by interceptor', token)
        config.headers.authorization = `Bearer ${token}`;
        return config
    }, function (error) {
        return Promise.reject(error);
    }
    )

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response
    }, async(error)=>{
        const status = error.response.status;
        console.log('status error in the interceptor', status)
        if(status === 401 || status == 403){
             await userSignOut()
             navigate('/login')
             
        }
        return Promise.reject(error);
    }

)
    return axiosSecure;
};

export default useAxisoSecure;