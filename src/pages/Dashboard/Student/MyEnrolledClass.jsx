import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";


const MyEnrolledClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    // get
    const { data: enrollClasses = [], isLoading, refetch } = useQuery({
        queryKey: ['enroll-class', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/enroll-class/${user?.email}`);
            console.log(data);
            return data;
        }

    });
    return (
        <div>
            <h2 className="text-3xl text-center font-bold mb-5">My Enrolled Classes</h2>

            <div className="grid gap-8  md:grid-cols-2">

                {
                    enrollClasses.map(enrollClass =>
                        <div key={enrollClass._id} className="card w-full bg-base-100 shadow-xl">
                            <figure><img className="h-64 w-full" src={enrollClass.photo} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{enrollClass.title}</h2>
                                <p className="text-sm">Instructed by <span className="font-semibold">{enrollClass.teacherName}</span></p>
                                <div className="card-actions justify-end">
                                    <Link to={`/dashboard/enroll-class/${enrollClass._id}`}><button className="btn bg-purple-600 text-white btn-sm">Continue</button></Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyEnrolledClass;