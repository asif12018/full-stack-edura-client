import { useParams } from "react-router-dom";
import useCourseDetails from "../../Hooks/useCourseDetails";
import { BounceLoader } from "react-spinners";
import { Button } from "flowbite-react";


const CourseDetails = () => {
    const id = useParams();
    // console.log(id);
    const [courseDetails, isCourseLoading, courseReload] = useCourseDetails(id.id);
    if (isCourseLoading) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
    console.log(courseDetails)
    return (
        <div>


            <div>
                <nav className="bg-gray-800 py-4">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <h1 className="text-white text-2xl font-bold">Course Details</h1>
                        <a href="#" className="text-gray-400 hover:text-white">About</a>
                    </div>
                </nav>
                <main className="container mx-auto mt-8">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-8/12 px-4 mb-8">
                            <img src={courseDetails?.
                                coursePhoto} alt="Featured Image" className="w-full h-64 object-cover rounded" />
                            <h2 className="text-4xl font-bold mt-4 mb-2">{courseDetails?.title}</h2>
                            <span className="border border-blue-600 rounded-full px-4 text-sm text-blue-600 py-0.5">
                                {courseDetails?.category}
                            </span>

                            <p><span className="font-bold">Instructor:</span>{courseDetails?.fullName}</p>
                            <p><span className="font-bold">Price:</span>{courseDetails?.price}$</p>
                            <p className="text-gray-700 mb-4"><span className="font-bold">Description: </span>{courseDetails?.description
                            }</p>
                            <p><span className="font-bold">Total Enrollment:</span>{courseDetails?.totalEnroll}</p>
                            <Button color="success" className="">Enroll and pay</Button>
                        </div>
                        <div className="w-full md:w-4/12 px-4 mb-8">
                            <div className="bg-gray-100 px-4 py-6 rounded">
                                <h3 className="text-lg font-bold mb-2">What you will get</h3>
                                <ul className="list-disc list-inside">
                                    <li><a href="#" className="text-gray-700 hover:text-gray-900">latest video</a></li>
                                    <li><a href="#" className="text-gray-700 hover:text-gray-900">assignment</a></li>
                                    <li><a href="#" className="text-gray-700 hover:text-gray-900">certificate</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>

            </div>


            <div className="p-4 mt-4">
  <h1 className="text-4xl text-center font-semibold mb-6">Process:</h1>
  <div className="container">
    <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
      <div className="flex md:contents">
        <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
          <div className="h-full w-6 flex items-center justify-center">
            <div className="h-full w-1 bg-green-500 pointer-events-none"></div>
          </div>
          <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
            <i className="fas fa-check-circle text-white"></i>
          </div>
        </div>
        <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
          <h3 className="font-semibold text-lg mb-1">Enroll the course</h3>
          <p className="leading-tight text-justify w-full">
           first you have to enroll in course
          </p>
        </div>
      </div>


      <div className="flex md:contents">
        <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
          <div className="h-full w-6 flex items-center justify-center">
            <div className="h-full w-1 bg-green-500 pointer-events-none"></div>
          </div>
          <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
            <i className="fas fa-check-circle text-white"></i>
          </div>
        </div>

        <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
          <h3 className="font-semibold text-lg mb-1">Pay for the Course</h3>
          <p className="leading-tight text-justify">
            You have to pay for the course to get full access
          </p>
        </div>
        
      </div>


      <div className="flex md:contents">
        <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
          <div className="h-full w-6 flex items-center justify-center">
            <div className="h-full w-1 bg-green-500 pointer-events-none"></div>
          </div>
          <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
            <i className="fas fa-check-circle text-white"></i>
          </div>
        </div>

        <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
          <h3 className="font-semibold text-lg mb-1">Watch the Course</h3>
          <p className="leading-tight text-justify">
            You have to watch all the video of all the course
          </p>
        </div>
        
      </div>


      <div className="flex md:contents">
        <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
          <div className="h-full w-6 flex items-center justify-center">
            <div className="h-full w-1 bg-green-500 pointer-events-none"></div>
          </div>
          <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
            <i className="fas fa-check-circle text-white"></i>
          </div>
        </div>

        <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
          <h3 className="font-semibold text-lg mb-1">Complete all the assignment</h3>
          <p className="leading-tight text-justify">
             you have to complete all the assignment
          </p>
        </div>
        
      </div>

      <div className="flex md:contents">
        <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
          <div className="h-full w-6 flex items-center justify-center">
            <div className="h-full w-1 bg-green-500 pointer-events-none"></div>
          </div>
          <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
            <i className="fas fa-check-circle text-white"></i>
          </div>
        </div>

        <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
          <h3 className="font-semibold text-lg mb-1">Get Certificate</h3>
          <p className="leading-tight text-justify">
             After completing the course you will get the a certificate
          </p>
        </div>
        
      </div>


     
     
    </div>
  </div>
</div>
        </div>
    );
};

export default CourseDetails;