import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useAllClasses from "../../Hooks/useAllClasses";
import { BounceLoader } from "react-spinners";
import { useState } from "react";
import useAllTheAssignment from "../../Hooks/useAllTheAssignment";
import { Table } from "flowbite-react";


const MyEnrollCourseDetails = () => {
    const location = useLocation();
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const assignmentPerPages = 3;
    const [currentAssignment, setCurrentAssignment] = useState(1);
    const { id } = useParams()
    const [allClass, classLoading, classReload] = useAllClasses(location.pathname.split('/')[3]);
    const [assignment, assignmentLoading, assignmentRelaod] = useAllTheAssignment(location.pathname.split('/')[3]);
    if (classLoading || assignmentLoading) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }

    console.log(assignment)




    //calculate pagination index
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allClass.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allClass.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    //calculating the assignment pagination index
    const indexOfLastAssignment = currentAssignment * assignmentPerPages;
    const indexOfFirstAssignment = indexOfLastAssignment - assignmentPerPages;
    const currentNewAssignment = assignment.slice(indexOfFirstAssignment, indexOfLastAssignment);
    const totalAssignmentPages = Math.ceil(assignment.length / assignmentPerPages)
    const paginates = (pageNumbers) => setCurrentAssignment(pageNumbers);
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-1 md:col-span-2">
                    <Outlet></Outlet>
                </div>
                <div className="grid-cols-1 bg-[#111827] ">
                    <h3 className="font-bold text-white my-2">total class:</h3>
                    {
                        currentItems?.map((items, index) => <div key={index} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-3 my-2">

                            <Link to={`/dashboard/myenroll-class/${location.pathname.split('/')[3]}/watch/${items._id}/`} className="text-lg text-white">
                                {
                                    items?.classTitle
                                }
                            </Link>

                        </div>)
                    }
                    <div className="pagination">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">Previous</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'pagination-btn active' : 'pagination-btn'}>{i + 1}</button>
                        ))}
                        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= allClass.length} className="pagination-btn">Next</button>
                    </div>
                </div>


            </div>
            <div className="bg-[#111827] py-5">
                <h3 className="text-2xl font-bold text-white text-center">Course Assignment</h3>
                <div>
                    <div className="overflow-x-auto">
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Title</Table.HeadCell>
                                <Table.HeadCell>Description</Table.HeadCell>
                                <Table.HeadCell>DeadLine</Table.HeadCell>
                                <Table.HeadCell>submit</Table.HeadCell>
                            </Table.Head>


                            <Table.Body className="divide-y">

                                {
                                    currentNewAssignment?.map((items, index) => <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {items?.assignmentTitle}
                                        </Table.Cell>
                                        <Table.Cell>{items?.description}</Table.Cell>
                                        <Table.Cell>{items?.deadline}</Table.Cell>
                                        <Table.Cell><btn className='btn btn-sm'>submit</btn></Table.Cell>

                                    </Table.Row>)
                                }



                            </Table.Body>
                        </Table>
                    </div>
                </div>
                <div className="pagination">
                    <button onClick={() => paginates(currentAssignment - 1)} disabled={currentAssignment === 1} className="pagination-btn">Previous</button>
                    {Array.from({ length: totalAssignmentPages }, (_, i) => (
                        <button key={i} onClick={() => paginates(i + 1)} className={currentAssignment === i + 1 ? 'pagination-btn active' : 'pagination-btn'}>{i + 1}</button>
                    ))}
                    <button onClick={() => paginates(currentAssignment + 1)} disabled={indexOfLastItem >= assignment.length} className="pagination-btn">Next</button>
                </div>
            </div>
        </div>


    );
};

export default MyEnrollCourseDetails;