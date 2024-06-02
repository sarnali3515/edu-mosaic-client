import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";



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
            <h2>{course.title}</h2>
        </div>
    );
};

export default ClassDetails;