import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useAllClasses from "../../Hooks/useAllClasses";
import { BounceLoader } from "react-spinners";
import { useState } from "react";


const MyEnrollCourseDetails = () => {
    const location = useLocation();
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const {id}= useParams()
    const [allClass, classLoading, classReload] = useAllClasses(location.pathname.split('/')[3]);
    if(classLoading){
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }

    
    



    //calculate pagination index
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allClass.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allClass.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-1 md:col-span-2">
                    <Outlet></Outlet>
                </div>
                <div className="grid-cols-1 bg-[#111827] ">  
                    <h3 className="font-bold text-white my-2">total class:</h3>
                   {
                    currentItems?.map((items,index)=> <div key={index} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-3 my-2">

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
        </div>
    );
};

export default MyEnrollCourseDetails;