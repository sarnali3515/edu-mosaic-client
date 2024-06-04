import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";


const ClassDetails = () => {
    const { coursePayment, setCoursePayment } = useAuth();
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
            <span className="loading loading-lg loading-spinner text-success"></span>
        </div>
    }

    return (
        <div>
            <Helmet>
                <title>EduMosaic - Class Details</title>
            </Helmet>
            <div className="hero py-10 ">
                <div className="card w-full max-w-6xl  mx-auto">
                    <h2 className="text-3xl text-center font-bold mb-8">Course Details</h2>
                    <div className="flex gap-20">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold mt-8">{course.title}</h2>
                            <p><strong>Teacher:</strong> {course.teacherName}</p>
                            <p><strong>Price:</strong> ${course.price}</p>
                            <p><strong>Description:</strong> {course.description}</p>
                            <Link to="/dashboard/payment"><button className="btn bg-purple-600 text-white mt-6">Pay Now</button></Link>
                        </div>
                        <img src={course.photo} alt={course.title} className="max-w-lg h-auto mb-6" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;