import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useCourses from '../../hooks/useCourses';
import { Link } from 'react-router-dom';

const AllClasses = () => {
    const [courses, isLoading] = useCourses();
    console.log(courses);

    // Filter the courses to show only those with status 'Approved'
    const approvedCourses = courses.filter(course => course.status === 'Approved');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentCourses = approvedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const totalPages = Math.ceil(approvedCourses.length / itemsPerPage);

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
        <div className="bg-purple-200 md:py-10 md:px-28 ">
            <Helmet>
                <title>EduMosaic - All Classes</title>
            </Helmet>
            <div className='max-w-screen-xl mx-auto'>
                <h1 className="text-xl md:text-3xl font-semibold mb-8 text-center">All Classes</h1>
                <div className="space-y-8">
                    {currentCourses.map((course) => (
                        <div key={course._id}>
                            <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
                                <div className='md:w-2/5 '>
                                    <img src={course.photo} alt={course.title} className="w-full h-64 md:h-80 p-5 " />
                                </div>
                                <div className="p-8 flex-1">
                                    <h5 className="text-2xl font-semibold w-24 p-1 border border-purple-300 mb-3">{course.price}.00</h5>
                                    <h2 className="text-2xl md:text-3xl font-bold">{course.title}</h2>
                                    <p className="border-b-2 border-dashed pb-2 border-purple-400">Instructed by - {course.teacherName}</p>
                                    <p className="my-2">{course.description}</p>
                                    <p>Total Enrollment: {course.totalEnrollment}</p>
                                    <Link to={`${course._id}`}><button className="btn bg-purple-500 text-white px-5 mt-3">Enroll Now</button></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-8 space-y-2">
                    <div className="text-center">
                        <p className='text-purple-600 text-xs md:text-base font-semibold'>
                            Showing {indexOfFirstCourse + 1} to {indexOfLastCourse > approvedCourses.length ? approvedCourses.length : indexOfLastCourse} of {approvedCourses.length} results
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

export default AllClasses;
