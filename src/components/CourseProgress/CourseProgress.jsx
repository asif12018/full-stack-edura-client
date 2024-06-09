import { BounceLoader } from "react-spinners";
import useCourseDetails from "../../Hooks/useCourseDetails";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import useAxisoSecure from './../../Hooks/useAxiosSecure';
import useAllTheAssignment from "../../Hooks/useAllTheAssignment";
import Swal from "sweetalert2";
import useAllClass from "../../Hooks/useAllClass";



const CourseProgress = () => {
    const axiosSecure = useAxisoSecure()
    const [isOpen, setIsOpen] = useState(false);
    const [isOpens, setIsOpens] = useState(false);
    const id = useParams();
    const  [courseDetails, isCourseLoading, courseReload] = useCourseDetails(id.id);
    const [assignment, assignmentLoading, assignmentRelaod] = useAllTheAssignment(id.id);
    const [video, classLoading, classReload] = useAllClass(id.id);


    //react hook form for assignment
    const { register:registerForm1, handleSubmit:handleSubmitForm1, watch, reset:formReset1,formState: { errors:errorsForm1 } } = useForm();
   const onSubmitForm1 = data => {
    
    setIsOpen(false);

    const assignment = {
      assignmentTitle:data.title,
      deadline:data.deadline,
      description:data.description,
      createdDate:moment().format('YYYY-MM-DD'),
      courseId : courseDetails?._id
    }
    //send assignment to the database
    axiosSecure.post('/addAssignment',assignment)
    .then(res =>{
      
      if(res.data.acknowledged){
        console.log(res.data)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Assignment created successfully",
          showConfirmButton: false,
          timer: 1500
        });
        formReset1();
        assignmentRelaod();
      }
    }).catch(err =>{
      console.log(err)
    })
    
};

    //react hook form for class video
    const { register:registerForm2, handleSubmit:handleSubmitForm2, reset:resetForm2,  formState: { errors:errorsForm2 } } = useForm();
   const onSubmitForm2 = data => {
    console.log(data);
    setIsOpens(false);
    //class details
    const classData = {
      classTitle : data.classTitle,
      description: data.description,
      url: data.url,
      courseId:courseDetails._id
    }
    //api to send class on database
    axiosSecure.post('/addClass', classData)
    .then(res =>{
      if(res.data.acknowledged){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Class added Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        resetForm2()
      }
    })
};
    if(isCourseLoading || assignmentLoading || classLoading){
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
    //console.log(courseDetails)
    //react hook form
    //console.log(video)
  
    return (
        <div>
            <div>
            <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Course Progress</h1>

        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={courseDetails?.coursePhoto} alt=""/>

            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <p className="text-sm text-blue-500 uppercase">category and Name</p>

                <a href="#" className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white">
                    {courseDetails?.category}
                </a>
                <p className="text-lg text-white">title:{courseDetails?.title}</p>

             
             

            </div>
        </div>
    </div>
</section>

            <div>
            <div className=" bg-[#14452f]">
                    <div className="pt-12 bg-[#14452f] sm:pt-20">
                       
                        <div className="pb-12 mt-10  bg-[#14452f] sm:pb-16">
                            <div className="relative">
                                <div className="absolute inset-0 h-1/2  bg-[#14452f]"></div>
                                <div className="relative max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                                    <div className="max-w-4xl mx-auto">
                                        <dl className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:grid sm:grid-cols-2">
                                            <div
                                                className="flex flex-col p-6 text-center border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-r">
                                                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400" id="item-1">
                                                    Total Enroll
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                    aria-describedby="item-1" id="starsCount">
                                                   {courseDetails?.totalEnroll}
                                                </dd>
                                            </div>
                                            <div
                                                className="flex flex-col p-6 text-center border-t border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l sm:border-r">
                                                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                    Total Total Assignment
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                    id="downloadsCount">
                                                   0
                                                </dd>
                                            </div>
                                          
                                        </dl>
                                    </div>

                                    <div>

                                    <h3 className="text-2xl font-bold text-center my-3 text-white">total assignment per day</h3>
                                    <div>

     
                                    <div className="max-w-2xl mx-auto bg-indigo-600 shadow-lg rounded-lg">
            <div className="px-6 py-5">
                <div className="flex items-start">
                
                    <svg className="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                        <path className="text-indigo-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                        <path className="text-indigo-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                        <path className="text-indigo-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                    </svg>
                
                    <div className="flex-grow truncate">
                      
                        <div className="w-full sm:flex justify-between items-center mb-3">
                        
                            <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">Simple Design Tips</h2>
                          
                            <div className="flex-shrink-0 flex items-center space-x-3 sm:ml-2">
                                <button className="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                                    <svg className="w-4 h-4 flex-shrink-0 mr-2 fill-current text-gray-300 group-hover:text-gray-200" viewBox="0 0 16 16">
                                        <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                                    </svg>
                                    <span>498 <span className="sr-only">likes</span></span>
                                </button>
                                <button className="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                                    <svg className="w-4 h-4 flex-shrink-0 mr-2 fill-current text-gray-300 group-hover:text-gray-200" viewBox="0 0 16 16">
                                        <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7Zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8Z" />
                                    </svg>
                                    <span>64 <span className="sr-only">comments</span></span>
                                </button>
                            </div>
                        </div>
                     
                        <div className="flex items-end justify-between whitespace-normal">
                         
                            <div className="max-w-md text-indigo-100">
                                <p className="mb-2">Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.</p>
                            </div>
                         
                            <a className="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#0">
                                <span className="block font-bold"><span className="sr-only">Read more</span> </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

                                    </div>








                                    </div>
                                    <div>
                                        <button onClick={() => setIsOpen(!isOpen)} className="btn w-full my-3">+Add assignment</button>
                                    </div>
                                    <div>
                                        <button onClick={() => setIsOpens(true)} className="btn w-full mb-3">+Add Class</button>
                                    </div>
                                    

                                    <div>
                                    <div className="relative flex justify-center">
     

      {isOpen && (
        <div
          className={`fixed inset-0 z-10 overflow-y-auto transition duration-300 ease-out ${
            isOpen
              ? 'translate-y-0 opacity-100 sm:scale-100'
              : 'translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95'
          }`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <h3
                className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                id="modal-title"
              >
                Create Assignment
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                To create and add assignment you have to fillup this form
                please dont remove default day on title input.
              </p>

              <form onSubmit={handleSubmitForm1(onSubmitForm1)} className="mt-4" action="#">
                {/* <label
                  htmlFor="emails-list"
                  className="text-sm text-gray-700 dark:text-gray-200"
                >
                  Email address
                </label> */}

                <label className="block mt-3" htmlFor="email1">
                  <input
                   defaultValue={`Day-${assignment?.length}:`}
                    type="text"
                    name="title"
                    id="email1"
                    placeholder="assignment title"
                    {...registerForm1('assignmentTitle',{required:true})}
                    className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  />
                  {errorsForm1.assignmentTitle && <p className="font-bold text-red-600">Title is require</p>}
                </label>

                <label className="block mt-3" htmlFor="email2">
                  <input
                    type="date"
                    name="deadline"
                    id="email2"
                    placeholder="Enter the deadline"
                    {...registerForm1('deadline',{required:true})}
                    className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  />
                  {errorsForm1.deadline && <p className="text-red-500 font-bold">Deadline is require</p>}
                </label>

                <label className="block mt-3" htmlFor="email3">
                  <input
                    type="type"
                    name="description"
                    id="email3"
                    placeholder="description"
                    {...registerForm1('description',{required:true})}
                    className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  />
                  {errorsForm1.description && <p className="text-red-500 font-bold">description is require</p>}
                </label>

               

                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>

                  <button 
                    type="submit"
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Send Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}




      {isOpens && (
        <div
          className={`fixed inset-0 z-10 overflow-y-auto transition duration-300 ease-out ${
            isOpens
              ? 'translate-y-0 opacity-100 sm:scale-100'
              : 'translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95'
          }`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <h3
                className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                id="modal-title"
              >
                Add Class Video
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                To Add video you have to fillup this form
              </p>

              <form onSubmit={handleSubmitForm2(onSubmitForm2)} className="mt-4" action="#">
                {/* <label
                  htmlFor="emails-list"
                  className="text-sm text-gray-700 dark:text-gray-200"
                >
                  Email address
                </label> */}

                <label className="block mt-3" htmlFor="email1">
                  <input
                    defaultValue={`Day-${video?.length}:`}
                    type="text"
                    name="title"
                    id="email1"
                    placeholder="class video title"
                    {...registerForm2('classTitle',{required:true})}
                    className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  />
                  {errorsForm2.classTitle && <p className="font-bold text-red-600">Title is require</p>}
                </label>

                <label className="block mt-3" htmlFor="email2">
                  <input
                    type="text"
                    name="deadline"
                    id="email2"
                    placeholder="description of the class"
                    {...registerForm2('description',{required:true})}
                    className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  />
                  {errorsForm2.description && <p className="text-red-500 font-bold">Description is require</p>}
                </label>

                <label className="block mt-3" htmlFor="email3">
                  <input
                    type="type"
                    name="url"
                    id="email3"
                    placeholder="url"
                    {...registerForm2('url',{required:true})}
                    className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  />
                  {errorsForm2.url && <p className="text-red-500 font-bold">url is require</p>}
                </label>

               

                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={() => setIsOpens(false)}
                    className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>

                  <button 
                    type="submit"
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Add Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CourseProgress;