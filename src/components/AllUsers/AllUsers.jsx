import { useEffect, useState } from "react";
import useAllUser from "../../Hooks/useAllUser";
import { Avatar, Button, Table } from "flowbite-react";
import { BounceLoader } from "react-spinners";
import useAxisoSecure from "../../Hooks/useAxiosSecure";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './AllUsers.css'; 
import useSearchSuggest from "../../Hooks/useSearchSuggest";

const AllUsers = () => {
    const axiosSecure = useAxisoSecure();
    // total users
    const [keyword, setKeyword] = useState({});
    const [allUserData, isAllUserLoading, isAllUserReLoading] = useAllUser(keyword);
    const [isTeacher, setIsteacher] = useState([]);
    const [isAdmin, setIsAdmin] = useState([]);
    const [allSuggestion, loadingSuggestion] = useSearchSuggest();
    
    // useEffect(() => {
    //     const teacher = allSuggestion.filter(user => user.role === 'teacher');
    //     const admin = allSuggestion.filter(user => user.role === 'admin');
    //     setIsAdmin(admin);
    //     setIsteacher(teacher);
    // }, [allSuggestion]);
    useEffect(() => {
        const teacher = allSuggestion.filter(user => user.role === 'teacher');
        const admin = allSuggestion.filter(user => user.role === 'admin');

        setIsteacher((prev) => {
            const prevTeacherIds = prev.map(user => user.id);
            const newTeacherIds = teacher.map(user => user.id);
            if (JSON.stringify(prevTeacherIds) !== JSON.stringify(newTeacherIds)) {
                return teacher;
            }
            return prev;
        });

        setIsAdmin((prev) => {
            const prevAdminIds = prev.map(user => user.id);
            const newAdminIds = admin.map(user => user.id);
            if (JSON.stringify(prevAdminIds) !== JSON.stringify(newAdminIds)) {
                return admin;
            }
            return prev;
        });

    }, [allSuggestion]);

    if (isAllUserLoading || loadingSuggestion) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>;
    }

    // make a normal user admin
    const handleAdmin = async (id) => {
        console.log(id);
        axiosSecure.patch(`/promote/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    console.log(res.data);
                    isAllUserReLoading();
                }
            }).catch(err => {
                console.log(err);
            });
    };

    // react search auto complete
    const items = allSuggestion;
    const handleOnSearch = (string, results) => {
        // console.log(string, results);
        
    };
    const handleOnHover = (result) => {
        // console.log(result);
    };
    const handleOnSelect = (item) => {
        console.log(item.email);
        setKeyword(item.email);
    };
    const handleOnFocus = () => {
        // console.log('Focused');
    };
    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>email: {item.email}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
            </>
        );
    };

    return (
        <div>
            <div>
                <div className="bg-[#14452f]">
                    <div className="pt-12 bg-[#14452f] sm:pt-20">
                        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-extrabold leading-9 bg-[#14452f] dark:text-white sm:text-4xl sm:leading-10">
                                    Total Active User
                                </h2>
                                <p className="mt-3 text-xl leading-7 text-gray-600 dark:text-gray-400 sm:mt-4">
                                    Take a overview of Number of total user
                                </p>
                            </div>
                        </div>
                        <div className="pb-12 mt-10 bg-[#14452f] sm:pb-16">
                            <div className="relative">
                                <div className="absolute inset-0 h-1/2 bg-[#14452f]"></div>
                                <div className="relative max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                                    <div className="max-w-4xl mx-auto">
                                        <dl className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                                            <div className="flex flex-col p-6 text-center border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-r">
                                                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400" id="item-1">
                                                    Total User
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                    aria-describedby="item-1" id="starsCount">
                                                    {allSuggestion?.length}
                                                </dd>
                                            </div>
                                            <div className="flex flex-col p-6 text-center border-t border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l sm:border-r">
                                                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                    Total Teacher
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                    id="downloadsCount">
                                                    {isTeacher?.length}
                                                </dd>
                                            </div>
                                            <div className="flex flex-col p-6 text-center border-t border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l">
                                                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                    Total Admin
                                                </dt>
                                                <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100"
                                                    id="sponsorsCount">
                                                    {isAdmin?.length}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Search Box */}
                <div className="mb-10" style={{ width: 400, zIndex: 10, position: 'relative' }}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                    />
                </div>

                {/* Table to show data */}
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Make Admin</Table.HeadCell>
                            <Table.HeadCell>User image</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                allUserData?.map((teacher, index) =>
                                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>{teacher?.name}</Table.Cell>
                                        <Table.Cell>{teacher?.email}</Table.Cell>
                                        <Table.Cell><Button onClick={() => handleAdmin(teacher?._id)} disabled={teacher?.role === 'admin'}>Make Admin</Button></Table.Cell>
                                        <Table.Cell>
                                            <div className="flex flex-wrap gap-2">
                                                <Avatar img={teacher?.photo} rounded />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
