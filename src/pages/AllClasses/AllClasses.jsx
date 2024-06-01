import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';


const fetchClasses = async () => {
    return [
        {
            title: 'React for Beginners',
            instructor: 'John Doe',
            image: 'https://via.placeholder.com/300',
            price: '$50',
            description: 'Learn the basics of React in this comprehensive course.',
            totalEnrollment: 120,
        },
        {
            title: 'Advanced CSS Techniques',
            instructor: 'Jane Smith',
            image: 'https://via.placeholder.com/300',
            price: '$75',
            description: 'Master advanced CSS techniques to build stunning websites.',
            totalEnrollment: 85,
        },
        // Add more classes as needed
    ];
};

const AllClasses = () => {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const getClasses = async () => {
            const classData = await fetchClasses();
            setClasses(classData);
        };

        getClasses();
    }, []);
    return (
        <div className=" bg-purple-200 md:py-10 md:px-28">
            <div >
                <Helmet>
                    <title>EduMosaic - All Classes</title>
                </Helmet>
                <div className="">
                    <h1 className="text-3xl font-semibold mb-8 text-center">All Classes</h1>
                    <div className="space-y-8">
                        {classes.map((classItem, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
                                <img src={classItem.image} alt={classItem.title} className="w-full md:w-1/3 h-64 md:h-72 object-cover p-5" />
                                <div className="p-8 flex-1">
                                    <h5 className='text-2xl font-semibold w-24 p-1 border border-purple-300 mb-3'>{classItem.price}.00</h5>
                                    <h2 className='text-2xl md:text-3xl font-bold border-b-2 border-dashed pb-2 border-purple-400'>{classItem.title}</h2>

                                    <p className='my-2'>{classItem.description}</p>
                                    <p>Total Enrollment: {classItem.totalEnrollment}</p>
                                    <button className='btn bg-purple-500 text-white px-5 mt-5'>Enroll Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AllClasses;