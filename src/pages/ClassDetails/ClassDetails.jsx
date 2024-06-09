import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import useAuth from "../../hooks/useAuth";


const ClassDetails = () => {
    const { setCoursePayment } = useAuth();
    const { id } = useParams()
    const axiosPublic = useAxiosSecure();
    const { data: course = {}, isLoading } = useQuery({
        queryKey: ['courses', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/course/${id}`);
            setCoursePayment(data)
            // console.log(data);
            return data;
        }
    })
    // console.log(coursePayment);

    if (isLoading) {
        return <div className="text-center my-10 md:my-20">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    return (
        <div>
            <Helmet>
                <title>EduMosaic - Class Details</title>
            </Helmet>
            <div className="hero py-10 border-l-4 bg-purple-200 border-purple-400 rounded my-5">
                <div className="card w-full md:max-w-6xl mx-auto">
                    <h2 className="text-3xl text-center font-bold border-b border-purple-400 pb-4">Course Details</h2>

                    <div className="flex flex-col md:flex-row gap-5 md:gap-20 mt-4">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold mt-8">{course.title}</h2>
                            <p><strong>Teacher:</strong> {course.teacherName}</p>
                            <p><strong>Price:</strong> ${course.price}</p>
                            <p><strong>Description:</strong> {course.description}</p>
                            <Link to="/dashboard/payment"><button className="btn bg-purple-600 text-white mt-6">Pay Now</button></Link>
                        </div>
                        <img src={course.photo} alt={course.title} className="md:max-w-lg h-auto md:mb-6 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;