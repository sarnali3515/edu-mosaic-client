import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageAllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosSecure('/courses')
            console.log(data);
            return data
        }
    })
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Class Title</th>
                            <th>Class Image</th>

                            <th>Teacher Email</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
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
                                                <img src={course.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>


                                <td> <span className="badge badge-ghost badge-sm">{course.teacherEmail}</span></td>
                                <td>
                                    {course.description}
                                </td>
                                <th className="">
                                    <button className="btn btn-xs bg-transparent text-green-600">Approve</button>



                                </th>
                                <th><button className="btn btn-xs bg-transparent text-red-600">Reject</button></th>
                                <th>
                                    <button className="btn btn-xs w-24 bg-transparent text-blue-600">See Progress</button>
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