import { useContext, useEffect, useState } from "react";
import { AuthContext } from './../../Provider/AuthProvider';
import useAxisoSecure from "../../Hooks/useAxiosSecure";
import useMyEnrollClass from "../../Hooks/useMyEnrollClass";
import { useQuery } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Tooltip } from "flowbite-react";
import moment from "moment";


const StudentProfile = () => {
    const [spend, setSpend] = useState(0);
    const axiosSecure = useAxisoSecure();
    const [myEnroll, enrollLoading, enrollRefetch] = useMyEnrollClass();
    //data from context api
    const { user } = useContext(AuthContext);

    const { data: submittedAssignment, isLoading, refetch } = useQuery({
        queryKey: ['submittedUserAssignment', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/getUserAssignment/${user.email}`)
            return res.data
        }
    })
    useEffect(() => {
        const sumPaid = myEnroll.reduce((sum, enrollment) => {
            const paidAmount = parseFloat(enrollment.paid);

            return sum + paidAmount;
        }, 0);


        setSpend(sumPaid);
    }, [myEnroll]);
    if (enrollLoading || isLoading) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
    }
      // Transform the data for the AreaChart
      const chartData = myEnroll.map(enrollment => ({
        date: moment(enrollment.date, "MMMM Do, YYYY").format("YYYY-MM-DD"),
        paid: parseFloat(enrollment.paid),
        courseTitle: enrollment.courseTitle
    }));

    
    console.log(myEnroll)
    return (
        <div>
            <div className="h-full bg-gray-200 p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                    <div className="absolute right-12 mt-4 rounded">


                    </div>
                    <div className="w-full h-[250px]">
                        <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div className="flex flex-col items-center -mt-20">
                        <img src={user?.photoURL} className="w-40 border-4 border-white rounded-full" />
                        <div className="flex items-center space-x-2 mt-2">
                            <p className="text-2xl">{user?.displayName}</p>
                            <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                        <p className="text-gray-700">Student</p>

                    </div>

                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col 2xl:w-1/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-24">Full name:</span>
                                    <span className="text-gray-700">{user?.displayName}</span>
                                </li>
                                {/* <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Birthday:</span>
                                    <span className="text-gray-700">24 Jul, 1991</span>
                                </li> */}
                                {/* <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Joined:</span>
                                    <span className="text-gray-700">10 Jan 2022 (25 days ago)</span>
                                </li> */}
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Mobile:</span>
                                    <span className="text-gray-700">(123) 123-1234</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Email:</span>
                                    <span className="text-gray-700">{user?.email}</span>
                                </li>
                                {/* <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Location:</span>
                                    <span className="text-gray-700">New York, US</span>
                                </li> */}
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Languages:</span>
                                    <span className="text-gray-700">English, Spanish</span>
                                </li>

                            </ul>
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Activity log</h4>
                            <div className="relative px-4">
                                <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

                                {/* <!-- start::Timeline item --> */}
                                <div className="flex items-center w-full my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-sm">Profile informations changed.</p>
                                        <p className="text-xs text-gray-500">3 min ago</p>
                                    </div>
                                </div>
                                {/* <!-- end::Timeline item -->

                        <!-- start::Timeline item --> */}
                                <div className="flex items-center w-full my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-sm">
                                            Connected with <a href="#" className="text-blue-600 font-bold">Colby Covington</a>.</p>
                                        <p className="text-xs text-gray-500">15 min ago</p>
                                    </div>
                                </div>
                                {/* <!-- end::Timeline item -->

                        <!-- start::Timeline item --> */}
                                <div className="flex items-center w-full my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-sm">Invoice <a href="#" className="text-blue-600 font-bold">#4563</a> was created.</p>
                                        <p className="text-xs text-gray-500">57 min ago</p>
                                    </div>
                                </div>
                                {/* <!-- end::Timeline item -->

                        <!-- start::Timeline item --> */}
                                <div className="flex items-center w-full my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-sm">
                                            Message received from <a href="#" className="text-blue-600 font-bold">Cecilia Hendric</a>.</p>
                                        <p className="text-xs text-gray-500">1 hour ago</p>
                                    </div>
                                </div>
                                {/* <!-- end::Timeline item -->

                        <!-- start::Timeline item --> */}
                                <div className="flex items-center w-full my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-sm">New order received <a href="#" className="text-blue-600 font-bold">#OR9653</a>.</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                {/* <!-- end::Timeline item --> */}

                                {/* <!-- start::Timeline item --> */}
                                <div className="flex items-center w-full my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-sm">
                                            Message received from <a href="#" className="text-blue-600 font-bold">Jane Stillman</a>.</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                {/* <!-- end::Timeline item --> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full 2xl:w-2/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Purchase</h4>
                            <p className="mt-2 text-gray-700">View your overall purchase  from here</p>


                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart width={730} height={250} data={chartData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="paid" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    <Area type="monotone" dataKey="courseTitle" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                </AreaChart>
                            </ResponsiveContainer>


                            
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Statistics</h4>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-indigo-600">Total Spend</span>
                                        <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <svg className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-end">
                                                <span className="text-2xl 2xl:text-3xl font-bold">$ {spend}</span>
                                                <div className="flex items-center ml-2 mb-1">
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                                    <span className="font-bold text-sm text-gray-500 ml-0.5">3%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-green-600">Order Course</span>
                                        <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <svg className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-end">
                                                <span className="text-2xl 2xl:text-3xl font-bold">{myEnroll.length}</span>
                                                <div className="flex items-center ml-2 mb-1">
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                                    <span className="font-bold text-sm text-gray-500 ml-0.5">5%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-blue-600">Total Submitted Assignment</span>
                                        <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <svg className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-end">
                                                <span className="text-2xl 2xl:text-3xl font-bold">{submittedAssignment.length}</span>
                                                <div className="flex items-center ml-2 mb-1">
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                                    <span className="font-bold text-sm text-gray-500 ml-0.5">7%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xl text-gray-900 font-bold">Enroll Course's </h4>
                        <a href="#" title="View All">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                            </svg>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 mt-8">

                        {
                            myEnroll.map(item => <a key={item._id} href="#" className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
                                <img src={item?.courseImage} className="w-16 rounded-full" />
                                <p className="text-center font-bold text-sm mt-1">{item?.courseTitle}</p>
                                <p className="text-xs text-gray-500 text-center">Instructor Name:{item?.instructorName}</p>
                            </a>)
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default StudentProfile;