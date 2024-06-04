import { BounceLoader } from "react-spinners";
import useTeacherAllCourse from "../../Hooks/useTeacherAllCourse";
import { Avatar, Button, Table } from "flowbite-react";
import useAxisoSecure from "../../Hooks/useAxiosSecure";


const MyCourses = () => {
    const axiosSecure = useAxisoSecure();
    const [teacherAllCourse, teacherAllCourseLoading, teacherAllCourseReLoad] = useTeacherAllCourse();
    if(teacherAllCourseLoading){
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }

    //const sent resubmit or review request for your course
    const handleReview = (id) =>{
        axiosSecure.patch(`/reviewRequest/${id}`)
        .then(res =>{
            if(res.data.modifiedCount > 0){
                console.log(res);
                teacherAllCourseReLoad()
            }
        }).catch(err =>{
            console.log(err);
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

                {/**==========         table           ============ */}

                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Image</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Short Description</Table.HeadCell>
                            <Table.HeadCell>Approve Button</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                            <Table.HeadCell>Course Progress</Table.HeadCell>

                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                teacherAllCourse?.map((teacher, index) =>

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
                                        <Table.Cell>{teacher?.isApproved == 'no'? 'pending':''}
                                        {teacher?.isApproved == 'yes'? 'approved':''}
                                        {teacher?.isApproved == 'reject'? 'rejected':''}
                                        </Table.Cell>
                                        <Table.Cell><Button onClick={()=>handleReview(teacher?._id)} disabled={(teacher?.isApproved == 'no' || teacher?.isApproved == 'yes')}>{teacher?.isApproved == 'no' ? 'pending':''}{teacher?.isApproved == 'yes' ? 'approved':''}{teacher?.isApproved == 'reject' ? 'request a review':''}</Button></Table.Cell>


                                        <Table.Cell>
                                            <Button color="failure" disabled={(teacher?.isApproved == 'no' || teacher?.isApproved == 'reject')}>show progress</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            }


                         
                        </Table.Body>
                    </Table>
                </div>
        </div>
    );
};

export default MyCourses;