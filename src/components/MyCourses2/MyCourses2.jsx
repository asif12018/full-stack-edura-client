import { BounceLoader } from "react-spinners";
import useTeacherAllCourse from "../../Hooks/useTeacherAllCourse";
import { Avatar, Button, Table } from "flowbite-react";
import useAxisoSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyCourses2 = () => {
    const itemsPerpage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const axiosSecure = useAxisoSecure();
    const [teacherAllCourse, teacherAllCourseLoading, teacherAllCourseReLoad] = useTeacherAllCourse();
    if (teacherAllCourseLoading) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
    //calculate pagination indexes
    const indexOfLastItem = currentPage * itemsPerpage;
    const indexOfFirstItem = indexOfLastItem - itemsPerpage;
    const currentItems = teacherAllCourse.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(teacherAllCourse.length / itemsPerpage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //const sent resubmit or review request for your course
    const handleReview = (id) => {
        axiosSecure.patch(`/reviewRequest/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    console.log(res);
                    teacherAllCourseReLoad()
                }
            }).catch(err => {
                console.log(err);
            })
    }
    //function to delete function
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteCourse/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                              });
                        }
                        teacherAllCourseReLoad();
                        
                    }).catch(err => {
                        console.log(err);
                    })

            }
        });
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
                                                Total Courses
                                            </dt>
                                            <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                aria-describedby="item-1" id="starsCount">
                                                0
                                            </dd>
                                        </div>
                                        <div
                                            className="flex flex-col p-6 text-center border-t border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l sm:border-r">
                                            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                Total Course request
                                            </dt>
                                            <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                id="downloadsCount">
                                                0
                                            </dd>
                                        </div>
                                        <div
                                            className="flex flex-col p-6 text-center border-t border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l">
                                            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                Total Course
                                            </dt>
                                            <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                id="sponsorsCount">
                                                0
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {currentItems.map((course, index) => (
                        <div key={index}>
                            <div className="flex flex-col justify-center items-center bg-gray-100 ">
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                                    <img src={course?.coursePhoto} alt="Mountain" className="w-full h-68 object-cover" />
                                    <div className="p-6">
                                        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{course?.title}</h2>
                                        <p className="text-gray-700 leading-tight ">
                                            <span className='font-semibold'>Details</span>:{course?.description}
                                        </p>
                                        <p className="text-gray-700 leading-tight">
                                            <span className='font-semibold'>Price</span>:{course?.price}$
                                        </p>
                                        <p className="text-gray-700 leading-tight">
                                            <span className='font-semibold'>Total Enroll</span>:{course?.totalEnroll}
                                        </p>
                                        <p className="text-gray-700 leading-tight"><span className="font-bold">Status: </span>
                                            {course?.isApproved == 'no' ? 'pending' : ''}
                                            {course?.isApproved == 'yes' ? 'Approved' : ''}
                                            {course?.isApproved == 'reject' ? 'Rejected' : ''}
                                        </p>
                                        <div className="flex items-center mb-2">
                                            <span className="text-gray-800 "><span className='font-semibold'>Instructor: </span>{course?.fullName}</span>
                                        </div>
                                        {/* <Link to={`/courseDetails/${course?._id}`}
                                        className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                                        <span>Enroll Now</span>
                                    </Link> */}
                                        <button className="btn w-full btn-success" onClick={() => handleReview(course?._id)} disabled={(course?.isApproved == 'no' || course?.isApproved == 'yes')}>{course?.isApproved == 'no' ? 'pending' : ''}{course?.isApproved == 'yes' ? 'approved' : ''}{course?.isApproved == 'reject' ? 'request a review' : ''}</button>
                                        <Link className="btn w-full  bg-blue-400 border-none text-white" to={`/dashboard/update/${course?._id}`} >Edit</Link>
                                        <button className="btn w-full bg-red-500 text-white"
                                            onClick={() => handleDelete(course?._id)}
                                        >Delete</button>
                                        <div className="flex justify-end items-end">
                                            <span className="text-gray-600 text-right">2 hours ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">Previous</button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'pagination-btn active' : 'pagination-btn'}>{i + 1}</button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= teacherAllCourse.length} className="pagination-btn">Next</button>
            </div>
        </div>
    );
};

export default MyCourses2;