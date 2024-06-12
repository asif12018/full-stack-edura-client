import { useParams } from "react-router-dom";
import useCourseDetails from "../../Hooks/useCourseDetails";
import { BounceLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import useAxisoSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { ReactStars } from 'react-rating-stars-component';



const CourseProgressDetails = () => {
    const axiosSecure = useAxisoSecure();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const { id } = useParams();
    console.log(id);
    const [courseDetails, isCourseLoading, courseReload] = useCourseDetails(id);
    const { data: review = [], isLoading: isReviewLoading, refetch } = useQuery({
        queryKey: ['feedBack'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/${id}`)
            return res.data;
        }
    })
    // console.log(courseDetails);
    if (isCourseLoading || isReviewLoading) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
    // console.log(review);
    //pagination calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = review.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(review.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>

            <div className="p-5 mx-auto sm:p-10 md:p-16 bg-[#14452f]">
                <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                    <h3 className="text-4xl font-bold text-white">Course Progress:</h3>
                    <img src={courseDetails?.coursePhoto} alt="" className="w-full h-60 sm:h-96 dark:bg-gray-500" />

                    <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50">
                        <div className="space-y-2">
                            <a rel="noopener noreferrer" href="#" className="inline-block text-2xl font-semibold sm:text-3xl">{courseDetails?.title}</a>
                            <p className="text-xs dark:text-gray-600">By
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline"> {courseDetails?.fullName}</a>
                            </p>
                        </div>
                        <div className="dark:text-gray-800">
                            <p>{courseDetails?.description}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded dark:bg-gray-50">
                    <div className="bg-gray-50 py-16 pt-32">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                    The Overview of the Course Progress
                                </h2>

                            </div>
                        </div>
                        <div className="mt-10 pb-1">
                            <div className="relative">
                                <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
                                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="max-w-4xl mx-auto">
                                        <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                            <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                                    Total Feed back

                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold text-gray-700">{review?.length}</dd>
                                            </div>
                                            <div
                                                className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                                    Price
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold text-gray-700">$ {courseDetails?.price}</dd>
                                            </div>
                                            <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                                    Total Enroll
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold text-gray-700">{courseDetails?.totalEnroll}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-bold text-4xl text-center my-3">Total feedback: {currentItems?.length}</h3>
                </div>
                <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                    <div>

                        {
                            currentItems?.map(item => <div key={item?._id} className="max-w-3xl w-full mx-auto z-10">
                                <div className="flex flex-col">
                                    <div className="bg-gray-900 border border-gray-900 shadow-lg  rounded-3xl p-4 m-4">
                                        <div className="flex-none sm:flex">
                                            <div className=" relative h-32 w-32   sm:mb-0 mb-3">
                                                <img src={item?.submitterPhoto} alt="aji" className=" w-32 h-32 object-cover rounded-2xl" />
                                                <a href="#"
                                                    className="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                                        className="h-4 w-4">
                                                        <path
                                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </div>
                                            <div className="flex-auto sm:ml-5 justify-evenly">
                                                <div className="flex items-center justify-between sm:mt-2">
                                                    <div className="flex items-center">
                                                        <p className="text-white"><span className="font-bold">Name: </span>{item?.submitterName}</p>

                                                    </div>

                                                </div>
                                                <p className="text-white"><span className="font-bold">Title:</span>{item?.courseTitle}</p>
                                                <p className="text-white"><span className="font-bold">Description:</span>{item?.description}</p>


                                                <div className="rating">
                                                    {[...Array(5)].map((_, index) => (
                                                        <input
                                                            key={index}
                                                            type="radio"
                                                            name="rating-4"
                                                            className="mask mask-star-2 bg-orange-400"
                                                            checked={item?.rating === index }
                                                            readOnly
                                                        />
                                                    ))}
                                                </div>



                                                <div className="rating">

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>

                    <div className="pagination">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">Previous</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'pagination-btn active' : 'pagination-btn'}>{i + 1}</button>
                        ))}
                        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= review.length} className="pagination-btn">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseProgressDetails;