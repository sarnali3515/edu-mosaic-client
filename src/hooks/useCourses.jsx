import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCourses = () => {

    const axiosPublic = useAxiosPublic();
    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/courses')
            console.log(data);
            return data;
        }
    })

    return [courses, isLoading]
};

export default useCourses;