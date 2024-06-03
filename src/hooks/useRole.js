
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()


    const { data: role, isLoading } = useQuery({
        queryKey: ['role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/${user?.email}`)
            return data.role
        }
    })

    // get user info

    return [role, isLoading]
};

export default useRole;