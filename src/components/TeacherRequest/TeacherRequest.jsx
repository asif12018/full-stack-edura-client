
import { BounceLoader } from "react-spinners";
import useTeacher from "../../Hooks/useTeacher";
import useAxisoSecure from './../../Hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Avatar, Button, Table } from "flowbite-react";
import useUser from "../../Hooks/useUser";
import useAllUser from "../../Hooks/useAllUser";
import useSearchSuggest from "../../Hooks/useSearchSuggest";


const TeacherRequest = () => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [reject, setReject] = useState([]);
    const [request, setRequest] = useState([]);
    const [approved, setApproved] = useState([]);
    const [userData, isLoading, reloadUser] = useUser();
    const [isTeacher, setIsTeacher] = useState();

    //total users
    const [allUserData, isAllUserLoading, isAllUserReLoading] = useAllUser();
    const [allSuggestion, loadingSuggestion] = useSearchSuggest();

    //total teacher
    const axiosSecure = useAxisoSecure();
    const { data: allTeacher = [], isLoadings, refetch } = useQuery({
        queryKey: ['allTeacher'],
        queryFn: async () => {
            const res = await axiosSecure('/allteachers')
            return res.data
        }
    })
    useEffect(() => {
        if (allTeacher.length > 0) {
            const rejectedTeachers = allTeacher.filter(teacher => teacher.isApproved == 'rejected');
            const requestedTeachers = allTeacher.filter(teacher => teacher.isApproved == 'no');
            const approvedTeachers = allTeacher.filter(teacher => teacher.isApproved == 'yes');

            setReject(rejectedTeachers);
            setRequest(requestedTeachers);
            setApproved(approvedTeachers);
        }
    }, [allTeacher]);

    useEffect(() => {
        if (allSuggestion.length > 0) {
            const teacher = allSuggestion.filter(user => user.role == 'teacher');
            setIsTeacher(teacher)
        }
    }, [allSuggestion])

    if (isLoadings || isLoading || isAllUserLoading || loadingSuggestion) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }

    // console.log(userData)


    // console.log(reject, request, approved)

    //approving the course function
    const handleApprove = (id, email) => {
        console.log(id, email)
        //approving request to the teachers collection
        axiosSecure.patch(`/teacher/${id}`)
            .then(res => {
                        
                if (res.data.modifiedCount > 0) {
                    console.log(res.data)
                    refetch();
                    isAllUserLoading();
                }
            }).catch(err => {
                console.log(err)
            })

        //making the student teacher
        axiosSecure.patch(`/user/${email}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    console.log(res.data)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    // rejecting the course request
    const handleReject = (id) => {
        axiosSecure.patch(`/teacher/reject/${id}`)
            .then(res => {

                if (res.data.modifiedCount > 0) {
                    console.log(res.data)
                    refetch();
                }
            }).catch(err => {
                console.log(err)
            })
    }
    //pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allTeacher.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(allTeacher.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);





    return (
        <div className="">
            <div className="">

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
                                                    Total Teacher
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                    aria-describedby="item-1" id="starsCount">
                                                    {isTeacher?.length}
                                                </dd>
                                            </div>
                                            <div
                                                className="flex flex-col p-6 text-center border-t border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l sm:border-r">
                                                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                    Total Teacher request
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                    id="downloadsCount">
                                                    {request.length}
                                                </dd>
                                            </div>
                                            <div
                                                className="flex flex-col p-6 text-center border-t border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l">
                                                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                    Total Rejected
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                    id="sponsorsCount">
                                                    {reject.length}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/** table */}


                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Image</Table.HeadCell>
                            <Table.HeadCell>Experience</Table.HeadCell>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Approve button</Table.HeadCell>
                            <Table.HeadCell>Reject button</Table.HeadCell>

                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                currentItems?.map((teacher, index) =>

                                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell> */}
                                        <Table.Cell>{teacher?.fullName}</Table.Cell>
                                        <Table.Cell><div className="flex flex-wrap gap-2">
                                            <Avatar img={teacher?.photo} rounded />
                                        </div></Table.Cell>
                                        <Table.Cell>{teacher?.skill}</Table.Cell>
                                        <Table.Cell>{teacher?.title}</Table.Cell>
                                        <Table.Cell>{teacher?.category}</Table.Cell>
                                        <Table.Cell>pending</Table.Cell>
                                        <Table.Cell><Button onClick={() => handleApprove(teacher?._id, teacher.email)} color="success" disabled={(teacher.isApproved == 'yes' || teacher.isApproved == 'reject')}>{teacher?.isApproved == 'yes' && 'Approved'}{teacher?.isApproved == 'reject' && 'not Approved'}{teacher?.isApproved == 'no' && 'Approve'}</Button></Table.Cell>


                                        <Table.Cell>
                                            <Button onClick={() => handleReject(teacher._id)} disabled={(teacher.isApproved == 'reject' || teacher.isApproved == 'yes')} color="failure">Reject</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            }


                            {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>


          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row> */}
                        </Table.Body>
                    </Table>
                </div>
                

                <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">Previous</button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'pagination-btn active' : 'pagination-btn'}>{i + 1}</button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= allTeacher.length} className="pagination-btn">Next</button>
            </div>


            </div>
        </div>
    );
};

export default TeacherRequest;