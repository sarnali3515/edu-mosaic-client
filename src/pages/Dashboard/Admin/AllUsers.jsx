import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaSearch } from 'react-icons/fa';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [searchQuery, setSearchQuery] = useState("");
    const [queryToSearch, setQueryToSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users", queryToSearch],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users?search=${queryToSearch}`);
            return data;
        },
    });

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#a38bbf",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        console.log(res.data);
                        refetch();
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Admin now`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
            }
        });
    };

    const handleSearch = () => {
        setQueryToSearch(searchQuery);
        setCurrentPage(1);  // Reset to first page on new search
        refetch();
    };

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return (
            <div className="text-center my-4 md:my-6">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h2 className="text-3xl text-center font-bold mb-5">Manage All Users</h2>
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by username or email"
                        className="input input-bordered w-full max-w-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="flex">
                        <button
                            className="flex items-center gap-2 -ml-3 px-4 py-2 rounded-md bg-purple-400 text-white hover:bg-purple-600 focus:outline-none"
                            onClick={handleSearch}
                        >
                            <FaSearch /> Search
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto shadow-md">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-purple-300">
                            <tr>
                                <th></th>
                                <th>User Image</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, idx) => (
                                <tr key={user._id}>
                                    <th>{indexOfFirstUser + idx + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photo} alt="User Avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <th>
                                        {user.role === 'admin' ? (
                                            <button disabled className="border rounded-lg px-2 py-[2px] text-green-600 disabled text-xs">Admin</button>
                                        ) : (
                                            <button
                                                className="btn btn-xs bg-transparent text-red-600"
                                                onClick={() => handleMakeAdmin(user)}
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-8 space-y-2">
                    <div className="text-left">
                        <p className='text-purple-600 font-semibold'>
                            Showing {indexOfFirstUser + 1} to {indexOfLastUser > users.length ? users.length : indexOfLastUser} of {users.length} results
                        </p>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                        <button
                            className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-purple-500'}`}
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'}`}
                                onClick={() => handlePageClick(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-purple-500'}`}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
