import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";


const Profile = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`)
            console.log(data);
            return data;
        }
    })
    if (loading || isLoading) {
        return (
            <div className="text-center my-4 md:my-6">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div >

            <div className="profile-container ">
                <h2 className="text-3xl text-center font-bold mb-5">My Profile</h2>
                <div className="profile-card bg-purple-200 shadow-xl rounded-lg overflow-hidden flex flex-col items-center p-8">
                    <img src={user.photoURL} alt={users.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{users.name}</h3>
                    <p className=" flex items-center justify-center gap-1 md:gap-2 text-lg  mb-2">
                        <MdOutlineEmail></MdOutlineEmail>
                        <span className="font-semibold">  Email:</span> {users.email}</p>
                    <p className=" flex items-center justify-center gap-1 md:gap-2 text-lg  mb-2">
                        <MdOutlinePhone></MdOutlinePhone>
                        <span className="font-semibold">  Phone:</span>
                        {
                            users.phone ? <span> {users.phone}</span>
                                :
                                'N/A'
                        }
                    </p>
                    <p className=" flex items-center justify-center gap-1 md:gap-2 text-lg  mb-2">
                        <FaRegUser></FaRegUser>
                        <span className="font-semibold">  Role:</span> <span className="text-green-600 uppercase">{users.role}</span></p>

                </div>
            </div>
        </div>
    );
};

export default Profile;