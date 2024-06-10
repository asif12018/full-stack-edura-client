// import { Link, Outlet, useLocation, useParams } from "react-router-dom";
// import useAllClasses from "../../Hooks/useAllClasses";
// import { BounceLoader } from "react-spinners";
// import { useContext, useEffect, useRef, useState } from "react";
// import useAllTheAssignment from "../../Hooks/useAllTheAssignment";
// import { Table, TableCell } from "flowbite-react";
// import { useForm } from "react-hook-form";
// import moment from "moment";
// import useAxisoSecure from './../../Hooks/useAxiosSecure';
// import Swal from "sweetalert2";
// import useAllSubmittedAssignment from "../../Hooks/useAllSubmittedAssignment";
// import { AuthContext } from "../../Provider/AuthProvider";

// const MyEnrollCourseDetails = () => {
//     const [userAssignment, setUserAssignment] = useState([]);
//     //data from context api 
//     const {user} = useContext(AuthContext);
//     const RefTitle = useRef(null);
//     const RefId = useRef(null);
//     const axiosSecure = useAxisoSecure();
//     const location = useLocation();
//     const itemsPerPage = 5;
//     const [currentPage, setCurrentPage] = useState(1);
//     const assignmentPerPages = 3;
//     const [currentAssignment, setCurrentAssignment] = useState(1);
//     const { id } = useParams()
//     const [allClass, classLoading, classReload] = useAllClasses(location.pathname.split('/')[3]);
//     const [assignment, assignmentLoading, assignmentRelaod] = useAllTheAssignment(location.pathname.split('/')[3]);
//     const [submitted, isSubmitting, reloadSubmitting] = useAllSubmittedAssignment(location.pathname.split('/')[3]);
//     //filter out submitter assignment
//     useEffect(()=>{
//         // const filter = assignment.filter(item => item.submitterEmail == user.email);
//         // setUserAssignment(filter);
//         const filter = submitted.filter(item => item.submitterEmail == user.email);
//         setUserAssignment(filter)
//     },[submitted, user?.email])
//     // console.log('user submitted assignment', userAssignment)
//     //asignment submit form
//     const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
//     const onSubmit = data => {
//         // console.log(RefId.current.innerText)
//         // console.log(RefId.current);
//         const assignmentData ={
//             link:data.link,
//             submittedDate:moment().format('YYYY-MM-DD'),
//             courseId:location.pathname.split('/')[3],
//             assignmentId:RefId.current.innerText,
//             assignmentTitle:RefTitle.current.innerText,
//             submitterEmail:user.email
//         }
//         //send submitted assignment to the database
//         axiosSecure.post('/submitAssignment',assignmentData)
//         .then(res =>{
//             console.log(res.data);
//             if(res.data.insertedId){
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: "Your assignment has been submitted",
//                     showConfirmButton: false,
//                     timer: 1500
//                   });
//                 reset();
//                 reloadSubmitting();
//                 assignmentRelaod();
//             }
            
//         }).catch(err =>{
//             console.log(err);
//         })
//         // console.log(submitted);
        

//     };
//     if (classLoading || assignmentLoading || isSubmitting) {
//         return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
//     }

//     // console.log(assignment)
//     // console.log(submitted);




//     //calculate pagination index
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = allClass.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(allClass.length / itemsPerPage);
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     //calculating the assignment pagination index
//     const indexOfLastAssignment = currentAssignment * assignmentPerPages;
//     const indexOfFirstAssignment = indexOfLastAssignment - assignmentPerPages;
//     const currentNewAssignment = assignment.slice(indexOfFirstAssignment, indexOfLastAssignment);
//     const totalAssignmentPages = Math.ceil(assignment.length / assignmentPerPages)
//     const paginates = (pageNumbers) => setCurrentAssignment(pageNumbers);

    
//     return (
//         <div>
//             <div className="grid grid-cols-1 md:grid-cols-3">
//                 <div className="col-span-1 md:col-span-2">
//                     <Outlet></Outlet>
//                 </div>
//                 <div className="grid-cols-1 bg-[#111827] ">
//                     <h3 className="font-bold text-white my-2">total class:</h3>
//                     {
//                         currentItems?.map((items, index) => <div key={index} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-3 my-2">

//                             <Link to={`/dashboard/myenroll-class/${location.pathname.split('/')[3]}/watch/${items._id}/`} className="text-lg text-white">
//                                 {
//                                     items?.classTitle
//                                 }
//                             </Link>

//                         </div>)
//                     }
//                     <div className="pagination">
//                         <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">Previous</button>
//                         {Array.from({ length: totalPages }, (_, i) => (
//                             <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'pagination-btn active' : 'pagination-btn'}>{i + 1}</button>
//                         ))}
//                         <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= allClass.length} className="pagination-btn">Next</button>
//                     </div>
//                 </div>


//             </div>
//             <div className="bg-[#111827] py-5">
//                 <h3 className="text-2xl font-bold text-white text-center">Course Assignment</h3>
//                 <div>
//                     <div className="overflow-x-auto">
//                         <Table>
//                             <Table.Head>
//                                 <Table.HeadCell>Title</Table.HeadCell>
//                                 <Table.HeadCell>Description</Table.HeadCell>
//                                 <Table.HeadCell>DeadLine</Table.HeadCell>
//                                 <Table.HeadCell>assignment id</Table.HeadCell>
//                                 <Table.HeadCell>submit</Table.HeadCell>
//                             </Table.Head>


//                             <Table.Body className="divide-y">

//                                 {
//                                     currentNewAssignment?.map((items, index) => <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                                         <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                                         <span ref={RefTitle} >{items?.assignmentTitle}</span>
//                                         </Table.Cell>
//                                         <Table.Cell>{items?.description}</Table.Cell>
//                                         <Table.Cell>{items?.deadline}</Table.Cell>
//                                         <Table.Cell><span ref={RefId}>{items?._id}</span></Table.Cell>
//                                          <Table.Cell><button   className='btn btn-sm' onClick={()=>document.getElementById('my_modal_3').showModal()}> submit</button></Table.Cell> 
//                                        {/**
//                                         *  <Table.Cell> {userAssignment.some(item => item.assignmentId === items._id) ? <button className="btn btn-sm">already submitted</button> : <button className='btn btn-sm' onClick={()=>document.getElementById('my_modal_3').showModal()}>Submit </button>}</Table.Cell>
//                                         * 
//                                         */}

//                                     </Table.Row>
                                    
//                                 )
//                                 }


// <dialog id="my_modal_3" className="modal " >
//   <div className="modal-box bg-[#111827]">
//     <form method="dialog">
//       {/* if there is a button in form, it will close the modal */}
//       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//     </form>
//     <h3 className="font-bold text-lg">Assignment Form:</h3>
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
//       <label htmlFor="">Please Submit Your assignment repository or google drive link</label>
//       <input className="form-control input w-full" name="assignment-link" placeholder="please enter your assignment link here" {...register("link",{required:true})}></input>
//       {errors.link && <p className="text-lg font-bold text-red-500">This field is required</p>}
//       <button onClick={()=>document.getElementById('my_modal_3').close()} type="submit" className="btn w-full">Submit</button>
//     </form>
//   </div>
// </dialog>



//                             </Table.Body>
//                         </Table>
//                     </div>
//                 </div>
//                 <div className="pagination">
//                     <button onClick={() => paginates(currentAssignment - 1)} disabled={currentAssignment === 1} className="pagination-btn">Previous</button>
//                     {Array.from({ length: totalAssignmentPages }, (_, i) => (
//                         <button key={i} onClick={() => paginates(i + 1)} className={currentAssignment === i + 1 ? 'pagination-btn active' : 'pagination-btn'}>{i + 1}</button>
//                     ))}
//                     <button onClick={() => paginates(currentAssignment + 1)} disabled={indexOfLastItem >= assignment.length} className="pagination-btn">Next</button>
//                 </div>
//             </div>
//         </div>


//     );
// };

// export default MyEnrollCourseDetails;




import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useAllClasses from "../../Hooks/useAllClasses";
import { BounceLoader } from "react-spinners";
import { useContext, useEffect, useState } from "react";
import useAllTheAssignment from "../../Hooks/useAllTheAssignment";
import { Table } from "flowbite-react";
import { useForm } from "react-hook-form";
import moment from "moment";
import useAxisoSecure from './../../Hooks/useAxiosSecure';
import Swal from "sweetalert2";
import useAllSubmittedAssignment from "../../Hooks/useAllSubmittedAssignment";
import { AuthContext } from "../../Provider/AuthProvider";

const MyEnrollCourseDetails = () => {
    const [userAssignment, setUserAssignment] = useState([]);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxisoSecure();
    const location = useLocation();
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const assignmentPerPages = 3;
    const [currentAssignment, setCurrentAssignment] = useState(1);
    const { id } = useParams();
    const [allClass, classLoading, classReload] = useAllClasses(location.pathname.split('/')[3]);
    const [assignment, assignmentLoading, assignmentRelaod] = useAllTheAssignment(location.pathname.split('/')[3]);
    const [submitted, isSubmitting, reloadSubmitting] = useAllSubmittedAssignment(location.pathname.split('/')[3]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    useEffect(() => {
        const filter = submitted.filter(item => item.submitterEmail == user.email);
        setUserAssignment(filter);
    }, [submitted, user?.email]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        const assignmentData = {
            link: data.link,
            submittedDate: moment().format('YYYY-MM-DD'),
            courseId: location.pathname.split('/')[3],
            assignmentId: selectedAssignment.id,
            assignmentTitle: selectedAssignment.title,
            submitterEmail: user.email
        };

        axiosSecure.post('/submitAssignment', assignmentData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your assignment has been submitted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                    reloadSubmitting();
                    assignmentRelaod();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    if (classLoading || assignmentLoading || isSubmitting) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allClass.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allClass.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastAssignment = currentAssignment * assignmentPerPages;
    const indexOfFirstAssignment = indexOfLastAssignment - assignmentPerPages;
    const currentNewAssignment = assignment.slice(indexOfFirstAssignment, indexOfLastAssignment);
    const totalAssignmentPages = Math.ceil(assignment.length / assignmentPerPages);
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
                        currentItems?.map((items, index) => (
                            <div key={index} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-3 my-2">
                                <Link to={`/dashboard/myenroll-class/${location.pathname.split('/')[3]}/watch/${items._id}/`} className="text-lg text-white">
                                    {items?.classTitle}
                                </Link>
                            </div>
                        ))
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
                                <Table.HeadCell>Assignment ID</Table.HeadCell>
                                <Table.HeadCell>Submit</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {
                                    currentNewAssignment?.map((items, index) => (
                                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {items?.assignmentTitle}
                                            </Table.Cell>
                                            <Table.Cell>{items?.description}</Table.Cell>
                                            <Table.Cell>{items?.deadline}</Table.Cell>
                                            <Table.Cell>{items?._id}</Table.Cell>
                                            <Table.Cell>
                                                <button
                                                    className='btn btn-sm'
                                                    onClick={() => {
                                                        setSelectedAssignment({
                                                            id: items?._id,
                                                            title: items?.assignmentTitle
                                                        });
                                                        document.getElementById('my_modal_3').showModal();
                                                    }}
                                                >
                                                    Submit
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
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

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-[#111827]">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Assignment Form:</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <label htmlFor="">Please Submit Your assignment repository or google drive link</label>
                        <input
                            className="form-control input w-full"
                            name="assignment-link"
                            placeholder="please enter your assignment link here"
                            {...register("link", { required: true })}
                        />
                        {errors.link && <p className="text-lg font-bold text-red-500">This field is required</p>}
                        <button
                            onClick={() => document.getElementById('my_modal_3').close()}
                            type="submit"
                            className="btn w-full"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyEnrollCourseDetails;
