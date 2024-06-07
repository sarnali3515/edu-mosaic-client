import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageAllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosSecure('/courses');
            console.log(data);
            return data;
        }
    });

    const handleApproveClass = course => {
        axiosSecure.patch(`/courses/approve/${course._id}`)
            .then(res => {
                console.log(res.data);
                refetch();
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `The class is approved!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleRejectClass = course => {
        axiosSecure.patch(`/courses/reject/${course._id}`)
            .then(res => {
                console.log(res.data);
                refetch();
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rejected Class`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastClass = currentPage * itemsPerPage;
    const indexOfFirstClass = indexOfLastClass - itemsPerPage;
    const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

    const totalPages = Math.ceil(classes.length / itemsPerPage);

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
            <h2 className="text-3xl text-center font-bold mb-5">Manage All Classes</h2>
            <div className="overflow-x-auto shadow-md">
                <table className="table">
                    {/* head */}
                    <thead className="bg-purple-300">
                        <tr>
                            <th></th>
                            <th>Class Title</th>
                            <th>Class Image</th>
                            <th>Teacher Email</th>
                            <th>Description</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClasses.map((course, idx) => (
                            <tr key={course._id}>
                                <th>{indexOfFirstClass + idx + 1}</th>
                                <td>
                                    <div>
                                        <div className="font-bold">{course.title}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask w-14 h-12">
                                                <img src={course.photo} alt="Class" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="badge badge-ghost badge-sm">{course.teacherEmail}</span></td>
                                <td>{course.description}</td>
                                <td>
                                    {course.status !== 'Pending' ? (
                                        <>
                                            <button disabled className={`btn btn-xs bg-transparent ${course.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                                                {course.status === 'Approved' ? 'Approved' : 'Rejected'}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleApproveClass(course)} className="btn btn-xs w-16 mb-1 bg-transparent text-green-600 border-green-400">Approve</button>
                                            <button onClick={() => handleRejectClass(course)} className="btn btn-xs w-16 bg-transparent text-red-600 border-red-400">Reject</button>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/dashboard/all-classes/${course._id}`}>
                                        <button disabled={course.status === 'Pending' || course.status === 'Rejected'} className="btn btn-xs w-24 bg-transparent text-blue-600">See Progress</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-8 space-y-2">
                <div className="text-left">
                    <p>
                        Showing {indexOfFirstClass + 1} to {indexOfLastClass > classes.length ? classes.length : indexOfLastClass} of {classes.length} results
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

export default ManageAllClasses;
