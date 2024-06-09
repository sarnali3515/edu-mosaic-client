import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyEnrolledClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // get
    const { data: enrollClasses = [], isLoading, refetch } = useQuery({
        queryKey: ['enroll-class', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/enroll-class/${user?.email}`);
            return data;
        }
    });

    const indexOfLastClass = currentPage * itemsPerPage;
    const indexOfFirstClass = indexOfLastClass - itemsPerPage;
    const currentClasses = enrollClasses.slice(indexOfFirstClass, indexOfLastClass);

    const totalPages = Math.ceil(enrollClasses.length / itemsPerPage);

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
            <h2 className="text-xl md:text-3xl text-center font-bold mb-5">My Enrolled Classes</h2>
            {enrollClasses.length === 0 && <p className="text-center text-lg">You have not enrolled in any classes</p>}
            <div className="grid gap-8 md:grid-cols-2">
                {currentClasses.map(enrollClass => (
                    <div key={enrollClass._id} className="card w-full bg-base-100 shadow-xl">
                        <figure><img className="h-64 w-full" src={enrollClass.photo} alt="Class" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{enrollClass.title}</h2>
                            <p className="text-sm">Instructed by <span className="font-semibold">{enrollClass.teacherName}</span></p>
                            <div className="card-actions justify-end">
                                <Link to={`/dashboard/enroll-class/${enrollClass._id}`}>
                                    <button className="btn bg-purple-600 text-white btn-sm">Continue</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-8 space-y-2">
                <div className="text-left">
                    <p className='text-purple-600 font-semibold'>
                        Showing {indexOfFirstClass + 1} to {indexOfLastClass > enrollClasses.length ? enrollClasses.length : indexOfLastClass} of {enrollClasses.length} results
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

export default MyEnrolledClass;
