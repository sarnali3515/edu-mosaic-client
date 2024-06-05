import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const StudentClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: classEnrollment } = useQuery({
        queryKey: ['class-enrollment', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/enrolled-class/${id}`);
            console.log(data);
            return data;
        }
    });

    const { data: classAssignments = [] } = useQuery({
        queryKey: ['class-assignment', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assignments/${classEnrollment.classId}`);
            console.log(data);
            return data;
        }
    });

    return (
        <div>
            <h2>Student class details</h2>
            <div className="overflow-x-auto shadow-md md:mx-12">
                <table className="table">
                    {/* head */}
                    <thead className="bg-purple-300">
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>


                    <tbody>
                        {/* row 1 */}

                        {
                            classAssignments?.map((classAssignment, idx) =>
                                <tr key={classAssignment._id}>
                                    <th>{idx + 1}</th>
                                    <td>{classAssignment.assignmentTitle}</td>
                                    <td>{classAssignment.assignmentDescription}</td>
                                    <td>{classAssignment.assignmentDeadline}</td>
                                    <th>
                                        <button className="btn btn-xs bg-purple-500 text-white">Submit</button>
                                    </th>
                                </tr>)
                        }


                    </tbody>

                </table>
                {
                    classAssignments?.length === 0 && <p className="py-5 text-center text-lg">No Assignment added yet.</p>
                }
            </div>

        </div>
    );
};

export default StudentClassDetails;