import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TeacherReq = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const { data } = await axiosSecure('/teacher-req');
            return data;
        }
    });

    const handleApproveTeacher = request => {
        axiosSecure.patch(`/teacher-req/approve/${request._id}`)
            .then(res => {
                refetch();
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `This user is now a Teacher!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleRejectTeacher = request => {
        axiosSecure.patch(`/teacher-req/reject/${request._id}`)
            .then(res => {
                refetch();
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rejected Teacher`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const indexOfLastRequest = currentPage * itemsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

    const totalPages = Math.ceil(requests.length / itemsPerPage);

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
            <div className="text-center my-10 md:my-20">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl md:text-3xl text-center font-bold mb-5">Teacher Requests</h2>
            <div className="overflow-x-auto shadow-lg">
                <table className="table">
                    {/* head */}
                    <thead className="bg-purple-300">
                        <tr>
                            <th></th>
                            <th>User Info</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Experience</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRequests.map((request, idx) => (
                            <tr key={request._id}>
                                <th>{indexOfFirstRequest + idx + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={request.image} alt="User" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{request.name}</div>
                                            <div className="text-sm opacity-50">{request.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{request.title}</td>
                                <td>{request.category}</td>
                                <td>{request.experience}</td>
                                <td className={request.status === 'Approved' ? 'text-green-600' : request.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}>
                                    {request.status}
                                </td>
                                <th className="grid gap-1">
                                    {request.status !== 'Pending' ? (
                                        <>
                                            <button disabled className="btn btn-xs bg-transparent text-green-600">Approve</button>
                                            <button disabled className="btn btn-xs bg-transparent text-red-600">Reject</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleApproveTeacher(request)} className="btn btn-xs bg-transparent text-green-600">Approve</button>
                                            <button onClick={() => handleRejectTeacher(request)} className="btn btn-xs bg-transparent text-red-600">Reject</button>
                                        </>
                                    )}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-8 space-y-2">
                <div className="text-left">
                    <p className='text-xs md:text-base text-purple-600 font-semibold'>
                        Showing {indexOfFirstRequest + 1} to {indexOfLastRequest > requests.length ? requests.length : indexOfLastRequest} of {requests.length} results
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
    );
};

export default TeacherReq;
