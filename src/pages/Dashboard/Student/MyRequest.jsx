import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const MyRequest = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: myRequests = [], isLoading, refetch } = useQuery({
        queryKey: ['my-requests', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/teacher-req/${user?.email}`);
            console.log(data);
            return data;
        }
    });

    return (
        <div>
            <h2 className="text-xl md:text-3xl text-center font-bold mb-5">My Teacher Requests</h2>
            <div className="overflow-x-auto shadow-lg">
                <table className="table">
                    {/* head */}
                    <thead className="bg-purple-300">
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Experience</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {myRequests.length === 0 && <p className="text-center text-lg">You did not send any request for teaching</p>}
                    <tbody>
                        {myRequests.map((request, idx) => (
                            <tr key={request._id}>
                                <th>{idx + 1}</th>

                                <td>{request.title}</td>
                                <td>{request.category}</td>
                                <td>{request.experience}</td>
                                <td className={request.status === 'Approved' ? 'text-green-600' : request.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}>
                                    {request.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRequest;