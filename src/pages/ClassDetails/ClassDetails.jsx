import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';



const ClassDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosSecure();
    const { data: course = {}, isLoading } = useQuery({
        queryKey: ['courses', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/course/${id}`)
            console.log(data);
            return data;
        }
    })



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
                    <div className="flex gap-10">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold mt-8">{course.title}</h2>
                            <p><strong>Teacher:</strong> {course.instructor}</p>
                            <p><strong>Price:</strong> ${course.price}</p>
                            <p><strong>Description:</strong> {course.description}</p>
                            <button className="btn bg-purple-600 text-white mt-6">Pay Now</button>
                        </div>
                        <img src={course.image} alt={course.title} className="max-w-lg h-auto mb-6" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;