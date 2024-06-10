import { useParams } from "react-router-dom";
import useSingleClass from "../../Hooks/useSingleClass";
import { BounceLoader } from "react-spinners";
import './MyEnrollClassVideo.css'

const MyEnrollClassVideo = () => {
    const { id } = useParams();
    const [classVideo, classVideoLoading, classVideoReload] = useSingleClass(id);

    if (classVideoLoading) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }

    // Assuming `classVideo.url` is a valid YouTube URL, extract the video ID
    const videoId = classVideo?.url?.split('/')[3]?.split('?')[0];

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Course:</h1>

                    <div className="mt-8 lg:-mx-6 lg:items-center">
                        <div className="relative overflow-hidden" style={{ paddingTop: '56.25%' }}>
                            <iframe
                                title="YouTube Video Player"
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="mt-6 lg:mt-0 lg:mx-6">
                            <a className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white">
                                {classVideo?.classTitle}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyEnrollClassVideo;
