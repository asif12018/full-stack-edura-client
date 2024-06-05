
import { BounceLoader } from 'react-spinners';
import useAllAvailableCourse from './../../Hooks/useAllAvailableCourse';
import Hero2 from '../../components/Hero2/Hero2.jsx';
import { Link } from 'react-router-dom';


const AvailableCourse = () => {
    const [availalbeCourse, availableCourseLoading, availableCourseReload] = useAllAvailableCourse();
    if(availableCourseLoading){
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
    console.log(availalbeCourse);
    return (
        <div>
            <Hero2></Hero2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {
                   availalbeCourse?.map((course,index) =><div key={index}>
                    <div className="flex flex-col justify-center items-center bg-gray-100 max-h-[500px]">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden  w-full">
        <img src={course?.coursePhoto} alt="Mountain" className="w-full h-64 object-cover"/>
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
            <div className="flex items-center mb-2">
                    <span className="text-gray-800 "><span className='font-semibold'>Instructor: </span>{course?.fullName}</span>
                </div>

                <Link to={`/courseDetails/${course?._id}`}
					className="border  border-green-500 bg-green-500 text-white rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
					<span>Enroll Now</span>
				</Link>
           
            <div className="flex justify-end items-end">
                
                <span className="text-gray-600 text-right">2 hours ago</span>
            </div>
        </div>
    </div>
</div>
                   </div>)
                }
            </div>
        </div>
    );
};

export default AvailableCourse;