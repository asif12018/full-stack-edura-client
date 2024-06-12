import { BounceLoader } from "react-spinners";
import useAllCourse from "../../Hooks/useAllCourse";
import { Avatar, Button, Table } from "flowbite-react";
import useAxisoSecure from './../../Hooks/useAxiosSecure';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const AllCourses = () => {
    const itemsPerPage = 10; //set the number of items per page
    const [currentPage, setCurrentPage] = useState(1); //Track the current Page
    const axiosSecure = useAxisoSecure();
    const [courseReq, setCourseReq] = useState(0);
    const [courseApprove, setCourseApprove] = useState(0);
    //data from all course hook
    const [courses, courseLoading, reloadCourse] = useAllCourse();
    //filtering some data
    useEffect(()=>{
        const filterReq = courses.filter(item => item.isApproved == 'no');
        const filterApprove = courses.filter(item => item.isApproved == 'yes');
        setCourseReq(filterReq);
        setCourseApprove(filterApprove);
    },[courses])
    if(courseLoading){
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
    // console.log('course',courses)
    //approving the course request
    const handleApprove = (id) =>{
         axiosSecure.patch(`/approveCourse/${id}`)
         .then(res =>{
            if(res.data.modifiedCount){
                console.log(res.data);
                reloadCourse();
            }
         }).catch(err =>{
            console.log(err);
         })
    }
    

    // reject the course request
    const handleReject = (id) =>{
        axiosSecure.patch(`/rejectCourse/${id}`)
        .then(res =>{
            if(res.data.modifiedCount){
                console.log(res.data);
                reloadCourse();
            }
        }).catch(err =>{
            console.log(err);
        })
    }

    //Calculate pagination indexex
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
   



    return (
        <div>
            <div className=" bg-[#14452f]">
                    <div className="pt-12 bg-[#14452f] sm:pt-20">
                        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-extrabold leading-9 bg-[#14452f] dark:text-white sm:text-4xl sm:leading-10">
                                    Total Course Request
                                </h2>
                                <p className="mt-3 text-xl leading-7 text-gray-600 dark:text-gray-400 sm:mt-4">
                                    Take a overview of total Course request.remove or approve them
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
                                                    {courses?.length}
                                                </dd>
                                            </div>
                                            <div
                                                className="flex flex-col p-6 text-center border-t border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l sm:border-r">
                                                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                    Total Course request
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                    id="downloadsCount">
                                                   {courseReq?.length}
                                                </dd>
                                            </div>
                                            <div
                                                className="flex flex-col p-6 text-center border-t border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l">
                                                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                    Total Course Approve
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                    id="sponsorsCount">
                                                    {courseApprove?.length}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/**========     table start from here     ========= */}
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Image</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Short Description</Table.HeadCell>
                            <Table.HeadCell>Approve Button</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Approve button</Table.HeadCell>
                            <Table.HeadCell>Reject button</Table.HeadCell>
                            <Table.HeadCell>See Progress Button</Table.HeadCell>

                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                currentItems?.map((teacher, index) =>

                                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell> */}
                                        <Table.Cell>{teacher?.title}</Table.Cell>
                                        <Table.Cell><div className="flex flex-wrap gap-2">
                                            <Avatar img={teacher?.coursePhoto}  />
                                        </div></Table.Cell>
                                        <Table.Cell>{teacher?.email}</Table.Cell>
                                        <Table.Cell>{teacher?.description}</Table.Cell>
                                        <Table.Cell>{teacher?.category}</Table.Cell>
                                        <Table.Cell>{teacher?.isApproved == 'no' ? 'pending' : ''}{teacher?.isApproved == 'yes' ? 'approved' : ''}{teacher?.isApproved == 'reject' ? 'reject' : ''}</Table.Cell>
                                        <Table.Cell><Button onClick={()=>handleApprove(teacher?._id)} disabled={(teacher?.isApproved == 'yes' || teacher?.isApproved == 'reject')}>{teacher?.isApproved == 'yes' ? 'Approved':'Approve'}</Button></Table.Cell>


                                        <Table.Cell>
                                            <Button onClick={()=>handleReject(teacher?._id)} disabled={(teacher?.isApproved == 'reject'|| teacher?.isApproved == 'yes')} color="failure">{teacher?.isApproved=='reject' ? 'rejected':'reject'}</Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                (teacher?.isApproved == 'reject' || teacher?.isApproved == 'no') ? <button className="btn btn-sm text-white" disabled>See Progress</button> : <Link to={`/dashboard/class/${teacher?._id}`} className="btn btn-sm">See Progress</Link>
                                            }
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            }


                         
                        </Table.Body>
                    </Table>
                </div>
                <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">Previous</button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'pagination-btn active' : 'pagination-btn'}>{i + 1}</button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= courses.length} className="pagination-btn">Next</button>
            </div>
        </div>
    );
};

export default AllCourses;