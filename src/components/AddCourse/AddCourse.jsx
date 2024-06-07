import { Button } from "flowbite-react";
import useAxisoSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const AddCourse = () => {
    const axiosSecure = useAxisoSecure()
    //data from context api
    const { user } = useContext(AuthContext);
    //axios secure hook
    const axiosPublic = useAxiosPublic();


    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // console.log(data);
        //send data to the data base
        const course = {
            category: data.category,
            coursePhoto: data.coursePhoto,
            description: data.description,
            email: data.email,
            fullName: data.fullName,
            price: data.price,
            title: data.title,
            isApproved: 'no',
            totalEnroll: '0'
        }
        console.log(course)
        axiosSecure.post('/addCourse', course)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    console.log(res.data)
                    Swal.fire({
                        position: "middle-middle",
                        icon: "success",
                        title: "Successfully Add course.wait for admin approved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset()
                }
            }).catch(errors => {
                console.log(errors)
            })
    }
    return (
        <div>
            <div className=" bg-[#14452f]">
                <div className="pt-12 bg-[#14452f] sm:pt-20">
                    <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold leading-9 bg-[#14452f] dark:text-white sm:text-4xl sm:leading-10">
                                Total Teacher Request
                            </h2>
                            <p className="mt-3 text-xl leading-7 text-gray-600 dark:text-gray-400 sm:mt-4">
                                Take a overview of total teacher request.remove or approve them
                            </p>
                        </div>
                    </div>
                    <div className="pb-12 mt-10  bg-[#14452f] sm:pb-16">
                        <div className="relative">
                            <div className="absolute inset-0 h-1/2  bg-[#14452f]"></div>
                            <div className="relative max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                                <div className="max-w-4xl mx-auto">
                                    <dl className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                                        <div
                                            className="flex flex-col p-6 text-center border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-r">
                                            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400" id="item-1">
                                                Total Course
                                            </dt>
                                            <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                aria-describedby="item-1" id="starsCount">

                                            </dd>
                                        </div>
                                        <div
                                            className="flex flex-col p-6 text-center border-t border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l sm:border-r">
                                            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                Submitted Course
                                            </dt>
                                            <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                id="downloadsCount">

                                            </dd>
                                        </div>
                                        <div
                                            className="flex flex-col p-6 text-center border-t border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l">
                                            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                Approved Course
                                            </dt>
                                            <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                id="sponsorsCount">

                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        {/**==========      form to add class      ============ */}

                        <div className="flex flex-col ">
                            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 my-5">
                                <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                                    <h1 className="mb-8 text-3xl text-center">Add Course Request</h1>
                                    <label >Title:</label>
                                    <input
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="email"
                                        placeholder="Enter you course title"
                                        {...register('title', { required: true })}
                                    />
                                    {errors.title?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide title</p>}
                                    <label >Full Name:</label>
                                    <input defaultValue={user?.displayName}
                                        type="text" readOnly={true}
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="fullname"
                                        placeholder="Full Name"
                                        {...register('fullName', { required: true })}
                                    />
                                    {errors.fullName?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide full name</p>}
                                    <label >Email:</label>
                                    <input defaultValue={user?.email}
                                        type="text" readOnly={true}
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="fullname"
                                        placeholder="enter the email"
                                        {...register('email', { required: true })}
                                    />
                                    {errors.fullName?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide full name</p>}

                                    {/* <label >Skill level:</label>
                            <select {...register('skill', { required: true })} className="block border border-grey-light w-full p-3 rounded mb-4" name="experience" id="cars" form="carform">
                                <option value="beginner">beginner</option>
                                <option value="mid-level">mid-level</option>
                                <option value="experienced">experienced</option>
                            </select> */}


                                    <label >Price:</label>
                                    <input
                                        type="number"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="price"
                                        placeholder="Enter the course price"
                                        {...register('price', { required: true })}
                                    />
                                    {errors.price?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide course price</p>}

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
                                    <label >Course thumnail url</label>
                                    <input
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="coursePhoto"
                                        placeholder="Photo URL of the course thumbnail"
                                        {...register('coursePhoto', { required: true })}
                                    />
                                    {errors.coursePhoto?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide photo URL</p>}
                                    <label >Course short description</label>
                                    <input
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="description"
                                        placeholder="Enter the description of your course"
                                        {...register('description', { required: true })}
                                    />
                                    {errors.coursePhoto?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide description</p>}

                                    {/* <label >Course image</label>
                            <input defaultValue={user?.photoURL}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="coursePhoto"
                                placeholder="Course Banner Url"
                                {...register('coursePhoto', { required: true })}
                            /> */}
                                    {/* {errors.photo?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide photo URL</p>} */}






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
                </div>
            </div>
        </div>
    );
};

export default AddCourse;