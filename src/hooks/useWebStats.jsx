import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useWebStats = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure('/users')
            // console.log(data);
            return data
        }
    })
    const { data: coursesAll } = useQuery({
        queryKey: ['coursesAll'],
        queryFn: async () => {
            const { data } = await axiosSecure('/courses')
            // console.log(data);
            return data
        }
    })
    const { data: enrollClass } = useQuery({
        queryKey: ['enrollClass'],
        queryFn: async () => {
            const { data } = await axiosSecure('/enroll-class')
            // console.log(data);
            return data
        }
    })
    const userLength = users?.length;
    const courseLength = coursesAll?.length;
    const enrollLength = enrollClass?.length;


    return [userLength, courseLength, enrollLength]
};

export default useWebStats;