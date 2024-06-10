
import { useParams } from 'react-router-dom';
import useCourseDetails from './../../Hooks/useCourseDetails';
import { BounceLoader } from 'react-spinners';

const MyEnrollCourseBanner = () => {
    const id = useParams();
    const [courseDetails, isCourseLoading, courseReload] = useCourseDetails(id.id);
    if (isCourseLoading) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Course:</h1>

                    <div className="mt-8 lg:-mx-6 lg:items-center">
                        <img className="object-cover w-full px-2 rounded-xl h-72 lg:h-96" src={courseDetails?.coursePhoto} alt="" />

                        <div className="mt-6  lg:mt-0 lg:mx-6 ">


                            <a className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white">
                                {courseDetails?.title}
                            </a>





                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyEnrollCourseBanner;