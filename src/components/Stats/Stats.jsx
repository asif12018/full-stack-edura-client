import { BounceLoader } from "react-spinners";
import useAllUser from "../../Hooks/useAllUser";
import useSearchSuggest from "../../Hooks/useSearchSuggest";
import CountUp from 'react-countup';
import useAllAvailableCourse from "../../Hooks/useAllAvailableCourse";
import { useEffect, useState } from "react";



const Stats = () => {
    const [totalEnrollSum, setTotalEnrollSum] = useState(0);
    const [allSuggestion, loadingSuggestion] = useSearchSuggest();
    const [availalbeCourse, availableCourseLoading, availableCourseReload] = useAllAvailableCourse();
    //calculate total enrollment
    
    useEffect(() => {
        const sum = availalbeCourse?.reduce((sum, enrollment)=>{
            const paidAmount = parseFloat(enrollment.totalEnroll) ||  0;
            return sum + paidAmount;
        },0);
        setTotalEnrollSum(sum);
      }, [availalbeCourse]);


    if(loadingSuggestion || availableCourseLoading){
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
  
    return (
        <div>
            <section id="comparison" aria-label="QuickEdit vs traditional editor" className="bg-slate-50 dark:bg-gray-800 py-20 sm:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl md:text-center">
            <h2 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white sm:text-4xl">The Faster, Affordable, Better
                Solution</h2>
            <p className="mt-4 text-lg tracking-tight text-slate-700 dark:text-gray-300">Discover the latest course from our instructor. learn and develop your carrier</p>
        </div>
        <ul role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
            <li>
                <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                    <li>
                        <figure className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10">
                            <blockquote className="relative p-3">
                                <p className="text-6xl font-bold tracking-tight text-slate-900 dark:text-white"><CountUp duration={5} end={allSuggestion.length} /></p>
                            </blockquote>
                            <figcaption className="text-center">
                                <div className="font-display text-slate-900 dark:text-white"> ✅ Total User</div>
                            </figcaption>
                        </figure>
                    </li>
                </ul>
            </li>
            <li>
                <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                    <li>
                        <figure className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10">
                            <blockquote className="relative p-3">
                                <p className="text-6xl font-bold tracking-tight text-slate-900 dark:text-white"><CountUp duration={5} end={availalbeCourse?.length}></CountUp></p>
                            </blockquote>
                            <figcaption className="text-center">
                                <div className="font-display text-slate-900 dark:text-white">✅  total Courses
                                </div>
                            </figcaption>
                        </figure>
                    </li>
                </ul>
            </li>
            <li>
                <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                    <li>
                        <figure className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10">
                            <blockquote className="relative p-3">
                                <p className="text-6xl font-bold tracking-tight text-slate-900 dark:text-white"><CountUp  duration={5} end={totalEnrollSum}></CountUp></p>
                            </blockquote>
                            <figcaption className="text-center">
                                <div className="font-display text-slate-900 dark:text-white">✅  Total Enrollment</div>
                            </figcaption>
                        </figure>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</section>
        </div>
    );
};

export default Stats;