import { useState } from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import DeleteModal from "../../../Components/Modal/DeleteModal";
import Swal from "sweetalert2";

const MyClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const closeModal = () => {
        setIsOpen(false);
    };

    // get
    const { data: courses = [], isLoading, refetch } = useQuery({
        queryKey: ['my-classes', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-classes/${user?.email}`);
            return data;
        }
    });

    //delete
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/course/${id}`)
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class Deleted!",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    });

    const handleDelete = async (id) => {
        try {
            await mutateAsync(id);
        } catch (err) {
            console.log(err);
        }
    };

    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const totalPages = Math.ceil(courses.length / itemsPerPage);

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
            <h2 className="text-3xl text-center font-bold mb-5">My Classes</h2>
            {courses.length === 0 && <p className="text-center text-lg">You did not add any classes</p>}
            <div className="space-y-8">
                {currentCourses.map((course) => (
                    <div key={course._id} className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
                        <img src={course.photo} alt={course.title} className="w-full md:w-1/3 h-64 md:h-72 object-cover p-5" />
                        <div className="p-8 flex-1">
                            <div className="flex gap-5">
                                <h5 className="text-xl font-semibold w-20 p-1 border border-purple-300 mb-3">${course.price}.00</h5>
                                <h5 className="text-lg font-semibold p-1 border border-purple-300 mb-3">
                                    <span className="font-bold">Status:</span>
                                    <span className={course.status === 'Approved' ? 'text-green-600' : course.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}>
                                        {course.status}
                                    </span>
                                </h5>
                            </div>
                            <h2 className="text-2xl md:text-2xl font-semibold">{course.title}</h2>
                            <p className="border-b-2 border-dashed pb-2 border-purple-400">By {course.teacherName}</p>
                            <p className="my-2">{course.description}</p>
                            <div className="flex flex-col md:flex-row md:gap-5">
                                {/* see details */}
                                <Link to={`/dashboard/teacher-class-details/${course._id}`}>
                                    <button disabled={course.status === 'Pending' || course.status === 'Rejected'} className="btn btn-success btn-outline px-5 mt-3">
                                        <CiCircleMore /> See Details
                                    </button>
                                </Link>
                                {/* update */}
                                <Link to={`/dashboard/my-classes/${course._id}`}>
                                    <button className="btn btn-info btn-outline px-5 mt-3">
                                        <MdOutlineEdit /> Update
                                    </button>
                                </Link>
                                {/* delete */}
                                <button
                                    onClick={() => {
                                        setIsOpen(true);
                                        setSelectedId(course._id);
                                    }}
                                    className="btn btn-error btn-outline px-5 mt-3"
                                >
                                    <MdDelete /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <DeleteModal handleDelete={handleDelete} id={selectedId} isOpen={isOpen} closeModal={closeModal} />
            </div>
            <div className="flex justify-between items-center mt-8 space-y-2">
                <div className="text-left">
                    <p className='text-purple-600 font-semibold'>
                        Showing {indexOfFirstCourse + 1} to {indexOfLastCourse > courses.length ? courses.length : indexOfLastCourse} of {courses.length} results
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

export default MyClasses;
