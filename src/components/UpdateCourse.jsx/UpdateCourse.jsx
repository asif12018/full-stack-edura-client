import { useParams } from "react-router-dom";
import useAxisoSecure from "../../Hooks/useAxiosSecure";
import useTeacherSingleCourse from "../../Hooks/useTeacherSingleCourse";
import { BounceLoader } from "react-spinners";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateCourse = () => {
    const axiosSecure = useAxisoSecure();
    const id = useParams();
    const [courseDetails, isLoading, refetch] = useTeacherSingleCourse(id.id);

    // Call useForm hook outside of any condition
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <BounceLoader color="#14452f" />
            </div>
        );
    }
    // console.log(courseDetails?.coursePhoto)

    const onSubmit = (data) => {
        // console.log(data);
        //send data to the database
        const course = {
            category: data.category,
            coursePhoto: data.coursePhoto,
            description: data.description,
            price: data.price,
            title: data.title,
        };
        // console.log(course);

        axiosSecure.patch(`/update/${id.id}`, course)
        .then(res => {
            
            if(res.data.modifiedCount > 0){
                console.log(res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Course has been update",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }).catch(err =>{
            console.log(err);
        })
        
    };

    return (
        <div>
            <div className="flex flex-col ">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 my-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Update Course</h1>
                        <label>Title:</label>
                        <input
                            type="text"
                            defaultValue={courseDetails?.title}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="title"
                            placeholder="Enter your course title"
                            {...register('title', { required: true })}
                        />
                        {errors.title?.type === 'required' && (
                            <p role="alert" className="text-red-500 font-bold">You must provide a title</p>
                        )}
                        <label>Full Name:</label>
                        <input defaultValue={courseDetails?.fullName}
                            type="text" readOnly={true}
                            
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name"
                            {...register('fullName', { required: true })}
                        />
                        {errors.fullName?.type === 'required' && (
                            <p role="alert" className="text-red-500 font-bold">You must provide a full name</p>
                        )}
                        <label>Email:</label>
                        <input defaultValue={courseDetails?.email}
                            type="text" readOnly={true}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Enter the email"
                            {...register('email', { required: true })}
                        />
                        {errors.email?.type === 'required' && (
                            <p role="alert" className="text-red-500 font-bold">You must provide an email</p>
                        )}
                        <label>Price:</label>
                        <input
                        defaultValue={courseDetails?.price}
                            type="number"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="price"
                            placeholder="Enter the course price"
                            {...register('price', { required: true })}
                        />
                        {errors.price?.type === 'required' && (
                            <p role="alert" className="text-red-500 font-bold">You must provide a course price</p>
                        )}
                        <label>Course Category:</label>
                        <select {...register('category', { required: true })} className="block border border-grey-light w-full p-3 rounded mb-4">
                            <option value="web development">web-development</option>
                            <option value="digital marketing">digital-marketing</option>
                            <option value="machine learning">machine-learning</option>
                            <option value="data science">data-science</option>
                            <option value="python development">python-development</option>
                            <option value="software development with flutter">software-development-with-flutter</option>
                            <option value="graphics design">graphics-design</option>
                            <option value="ui/ux design">ui/ux-design</option>
                            <option value="wordpress development">wordpress-development</option>
                        </select>
                        <label>Course thumbnail URL</label>
                        <input
                            defaultValue={courseDetails?.coursePhoto}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="coursePhoto"
                            placeholder="Photo URL of the course thumbnail"
                            {...register('coursePhoto', { required: true })}
                        />
                        {errors.coursePhoto?.type === 'required' && (
                            <p role="alert" className="text-red-500 font-bold">You must provide a photo URL</p>
                        )}
                        <label>Course short description</label>
                        <input
                            type="text"
                            defaultValue={courseDetails?.
                                description}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="description"
                            placeholder="Enter the description of your course"
                            {...register('description', { required: true })}
                        />
                        {errors.description?.type === 'required' && (
                            <p role="alert" className="text-red-500 font-bold">You must provide a description</p>
                        )}
                        <Button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                            gradientMonochrome="success"
                        >
                            Update
                        </Button>
                        <div className="text-center text-sm text-grey-dark mt-4">
                            By joining us, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">Terms of Service</a> and
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">Privacy Policy</a>.
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCourse;
