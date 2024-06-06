import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const ManageAllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosSecure('/courses')
            console.log(data);
            return data
        }
    })

    const handleApproveClass = course => {
        axiosSecure.patch(`/courses/approve/${course._id}`)
            .then(res => {
                console.log(res.data);
                refetch();
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `The class is approved!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            })
    }
    const handleRejectClass = course => {
        axiosSecure.patch(`/courses/reject/${course._id}`)
            .then(res => {
                console.log(res.data);
                refetch();
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rejected Class`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            })
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-bold mb-5">Manage All Classes</h2>
            <div className="overflow-x-auto shadow-md">
                <table className="table">
                    {/* head */}
                    <thead className="bg-purple-300">
                        <tr>
                            <th>

                            </th>
                            <th>Class Title</th>
                            <th>Class Image</th>

                            <th>Teacher Email</th>
                            <th>Description</th>
                            <th></th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((course, idx) => (
                            <tr key={course._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div>
                                        <div className="font-bold">{course.title}</div>

                                    </div>

                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask  w-14 h-12">
                                                <img src={course.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>


                                <td> <span className="badge badge-ghost badge-sm">{course.teacherEmail}</span></td>
                                <td>
                                    {course.description}
                                </td>
                                {
                                    course.status !== 'Pending' ?
                                        <> <th className="">
                                            {
                                                course.status === 'Approved' ?
                                                    <button disabled className="btn btn-xs bg-transparent text-green-600">Approved</button>
                                                    :
                                                    <button disabled className="btn btn-xs bg-transparent text-green-600">Approve</button>
                                            }



                                        </th>
                                            <th>
                                                {
                                                    course.status === 'Rejected' ?
                                                        <button disabled className="btn btn-xs bg-transparent text-red-600">Rejected</button>
                                                        :
                                                        <button disabled className="btn btn-xs bg-transparent text-red-600">Reject</button>
                                                }
                                            </th></>
                                        :
                                        <>
                                            <th className="">
                                                {
                                                    course.status === 'Approved' ?
                                                        <button onClick={() => handleApproveClass(course)} className="btn btn-xs bg-transparent text-green-600">Approved</button>
                                                        :
                                                        <button onClick={() => handleApproveClass(course)} className="btn btn-xs bg-transparent text-green-600">Approve</button>
                                                }



                                            </th>
                                            <th>
                                                {
                                                    course.status === 'Rejected' ?
                                                        <button onClick={() => handleRejectClass(course)} className="btn btn-xs bg-transparent text-red-600">Rejected</button>
                                                        :
                                                        <button onClick={() => handleRejectClass(course)} className="btn btn-xs bg-transparent text-red-600">Reject</button>
                                                }
                                            </th>
                                        </>
                                }
                                <th>
                                    <Link to={`/dashboard/all-classes/${course._id}`}>
                                        <button disabled={course.status === 'Pending' || course.status === 'Rejected'} className="btn btn-xs w-24 bg-transparent text-blue-600">See Progress</button>
                                    </Link>
                                </th>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageAllClasses;