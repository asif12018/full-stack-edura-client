import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxisoSecure from "../../Hooks/useAxiosSecure.jsx";
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser.jsx";
import useTeacher from "../../Hooks/useTeacher.jsx";
import { BounceLoader } from "react-spinners";
import clock from '../../assets/Animation - 1716706625927.json'
import Lottie from "lottie-react";

const TeachOnEdura = () => {
    //custom user hook
    
    const [userInfo, isLoading, reloadUser] = useUser();
    const [teacher, isGetting, reloadTeacher] = useTeacher();

  
    
    console.log('user info on teach on endura',teacher)
    const axiosSecure = useAxisoSecure()
    //data from context api
    const { user } = useContext(AuthContext);
    //axios secure hook
    const axiosPublic = useAxiosPublic()
    const { setUser, userCreate, updateUser, userSignIn, googleSignIn } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    if(isGetting || isLoading){
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }





    const onSubmit = (data) => {
        
        // console.log(data);
        const teacherInfo = {
            fullName: data.fullName,
            email:data.email,
            photo:data.photo,
            coursePhoto:data.coursePhoto,
            skill:data.skill,
            title:data.title,
            category:data.category,
            isApproved:'no'
        }
        console.log(teacherInfo)

        //sending data to the database
        axiosSecure.post('/apply',teacherInfo)
        .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    position: "middle-middle",
                    icon: "success",
                    title: "Your request being pending",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reloadTeacher();
                  reloadUser();
            }
        }).catch(err =>{
            console.log(err)
        })


    };



    if(userInfo?.role == 'student' && !teacher.isApproved){
        return (
            <div>
                <div className="bg-[url('https://i.postimg.cc/65JH39bw/abstract-green-texture-background-free-vector.jpg')] bg-no-repeat bg-center bg-cover min-h-screen flex flex-col bg-red-400">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                            <label >Full Name:</label>
                            <input defaultValue={user?.displayName}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="fullname"
                                placeholder="Full Name"
                                {...register('fullName', { required: true })}
                            />
                            {errors.fullName?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide full name</p>}
                            <label >Email address:</label>
                            <input defaultValue={user?.email}
                                type="email"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email" readOnly
                                placeholder="Email"
                                {...register('email', { required: true })}
                            />
                            {errors.email?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide email address</p>}
                            <label >Skill level:</label>
                            <select {...register('skill', { required: true })} className="block border border-grey-light w-full p-3 rounded mb-4" name="experience" id="cars" form="carform">
                                <option value="beginner">beginner</option>
                                <option value="mid-level">mid-level</option>
                                <option value="experienced">experienced</option>
                            </select>
    
                            
                            <label >Course title:</label>
                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="course title"
                                placeholder="Enter the course title"
                                {...register('title', { required: true })}
                            />
                            {errors.title?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide title</p>}
                            
                            <label >Course Category:</label>
                            <select {...register('category', { required: true })} className="block border border-grey-light w-full p-3 rounded mb-4" name="experience" id="cars" form="carform">
                                <option value="web development">web-development</option>
                                <option value="digital marketing">digital-marketing</option>
                                <option value="machine learning">machine-learning</option>
                                <option value="data science">data-science</option>
                                <option value="python development">python-development</option>
                                <option value="software development with fluter">software-development-with-fluter</option>
                                <option value="Graphics design">Graphics-design</option>
                                <option value="ui/ux design">ui/ux-design</option>
                                <option value="wordpress development">wordpress-development</option>
                            </select>
                            <label >User image</label>
                            <input defaultValue={user?.photoURL}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="photo"
                                placeholder="Photo URL"
                                {...register('photo', { required: true })}
                            />
                            {errors.photo?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide photo URL</p>}
    
                            <label >Course image</label>
                            <input defaultValue={user?.photoURL}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="coursePhoto"
                                placeholder="Course Banner Url"
                                {...register('coursePhoto', { required: true })}
                            />
                            {errors.photo?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide photo URL</p>}
    
    
    
    
    
    
                            <Button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                                gradientMonochrome="success"
                            >
                                Apply
                            </Button>
    
    
    
                            <div className="text-center text-sm text-grey-dark mt-4">
                                By Joining us, you agree to the
                                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">Terms of Service</a> and
                                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">Privacy Policy</a>.
                            </div>
                        </form>
    
    
                    </div>
                </div>
            </div>
        );
    }

    if(userInfo?.role == 'student' && teacher?.isApproved){
        return (
            <div>
                <div className="bg-[url('https://i.postimg.cc/65JH39bw/abstract-green-texture-background-free-vector.jpg')] bg-no-repeat bg-center bg-cover min-h-screen flex flex-col ">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h2 className="mb-8 text-3xl text-center">Hey! your almost there.🖐️🖐️🖐️</h2>
                            <Lottie animationData={clock} />
                            <p>we are verify your request. we will let you know shortly</p>
                            <button>Pending</button>
                        </form>
    
    
                    </div>
                </div>
            </div>
        )
    }
};



export default TeachOnEdura;