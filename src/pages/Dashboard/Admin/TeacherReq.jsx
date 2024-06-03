import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const TeacherReq = () => {
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const { data } = await axiosSecure('/teacher-req')
            console.log(data);
            return data
        }
    })
    return (
        <div>
            <h2 className="text-3xl text-center font-bold mb-5">Teacher Requests</h2>

            <div className="overflow-x-auto shadow-lg">
                <table className="table">
                    {/* head */}
                    <thead className="bg-purple-300">
                        <tr>
                            <th>

                            </th>
                            <th>User Info</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Experience</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, idx) => (
                            <tr key={request._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={request.image} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{request.name}</div>
                                            <div className="text-sm opacity-50">{request.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {request.title}
                                </td>
                                <td>{request.category}</td>
                                <td>{request.experience}</td>
                                <td className="text-yellow-600">{request.status}</td>
                                <th className="grid gap-1">
                                    <button className="btn btn-xs bg-transparent text-green-600">Approve</button>

                                    <button className="btn btn-xs bg-transparent text-red-600">Reject</button>
                                </th>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>


        </div>
    );
};

export default TeacherReq;