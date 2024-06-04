import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const AllUsers = () => {
    // const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure('/users')
            // console.log(data);
            return data
        }
    })

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#a38bbf",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        console.log(res.data);
                        refetch();
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Admin now`,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }

                    })
            }
        });

    }



    if (isLoading) {
        return (
            <div className="text-center my-4 md:my-6">
                <span className="loading loading-lg loading-spinner text-success"></span>
            </div>
        );
    }
    return (
        <div>
            <div>
                <h2 className="text-3xl text-center font-bold mb-5">Manage All Users</h2>
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by username or email"
                        className="input input-bordered w-full max-w-md"
                    />
                </div>
                <div className="overflow-x-auto shadow-md">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-purple-300">
                            <tr>
                                <th>

                                </th>
                                <th>User Image</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => (
                                <tr key={user._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {user.name}

                                    </td>
                                    <td>{user.email}</td>
                                    <th>
                                        {user.role === 'admin' ? (
                                            <button disabled className="border rounded-lg px-2 py-[2px] text-green-600 disabled text-xs">Admin</button>
                                        ) : (
                                            <button
                                                className="btn btn-xs bg-transparent text-red-600"
                                                onClick={() => handleMakeAdmin(user)}
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </th>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
};

export default AllUsers;