import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";


const MyClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['my-classes', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-classes/${user?.email}`)
            console.log(data);
            return data;
        }
    })

    if (isLoading) {
        return <div className="text-center my-10 md:my-20">
            <span className="loading loading-lg loading-spinner text-success"></span>
        </div>
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-bold mb-5">My Classes</h2>
            <div className="space-y-8">
                {
                    courses?.map((course) => (
                        <div key={course._id} className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
                            <img src={course.photo} alt={course.title} className="w-full md:w-1/3 h-64 md:h-72 object-cover p-5" />
                            <div className="p-8 flex-1">
                                <div className="flex gap-5">
                                    <h5 className="text-xl font-semibold w-20 p-1 border border-purple-300 mb-3">${course.price}.00</h5>
                                    <h5 className="text-lg font-semibold  p-1 border border-purple-300 mb-3"><span className="font-bold">Status:</span> <span className="text-yellow-600">Pending</span></h5>

                                </div>
                                <h2 className="text-2xl md:text-2xl font-semibold">{course.title}</h2>
                                <p className="border-b-2 border-dashed pb-2 border-purple-400">By {course.teacherName}</p>
                                <p className="my-2">{course.description}</p>
                                <div className="flex flex-col md:flex-row md:gap-5">
                                    <Link><button className="btn btn-success btn-outline px-5 mt-3"><CiCircleMore></CiCircleMore> See Details</button></Link>
                                    <Link><button className="btn btn-info btn-outline px-5 mt-3"><MdOutlineEdit></MdOutlineEdit> Update</button></Link>
                                    <Link><button className="btn btn-error btn-outline px-5 mt-3"><MdDelete></MdDelete> Delete</button></Link>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MyClasses;