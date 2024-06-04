import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { useState } from "react";
import DeleteModal from "../../../Components/Modal/DeleteModal";
import Swal from "sweetalert2";

const MyClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    // get
    const { data: courses = [], isLoading, refetch } = useQuery({
        queryKey: ['my-classes', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-classes/${user?.email}`);
            console.log(data);
            return data;
        }

    });

    //delete
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/course/${id}`)
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class Deleted!",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()

        },
        onError: () => {
            // console.log(errors);
        }

    })

    const handleDelete = async (id) => {
        console.log('Deleting id:', id);

        try {
            await mutateAsync(id)
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) {
        return <div className="text-center my-10 md:my-20">
            <span className="loading loading-lg loading-spinner text-success"></span>
        </div>
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-bold mb-5">My Classes</h2>
            {
                courses.length === 0 && <p className="text-center text-lg">You did not added any class</p>
            }
            <div className="space-y-8">
                {courses.map((course) => (
                    <div key={course._id} className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
                        <img src={course.photo} alt={course.title} className="w-full md:w-1/3 h-64 md:h-72 object-cover p-5" />
                        <div className="p-8 flex-1">
                            <div className="flex gap-5">
                                <h5 className="text-xl font-semibold w-20 p-1 border border-purple-300 mb-3">${course.price}.00</h5>
                                <h5 className="text-lg font-semibold  p-1 border border-purple-300 mb-3"><span className="font-bold">Status:</span> <span className={course.status === 'Approved' ? 'text-green-600' : course.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}>{course.status}</span></h5>
                            </div>
                            <h2 className="text-2xl md:text-2xl font-semibold">{course.title}</h2>
                            <p className="border-b-2 border-dashed pb-2 border-purple-400">By {course.teacherName}</p>
                            <p className="my-2">{course.description}</p>
                            <div className="flex flex-col md:flex-row md:gap-5">
                                <Link><button disabled={course.status === 'Pending' || course.status === 'Rejected'} className="btn btn-success btn-outline px-5 mt-3"><CiCircleMore /> See Details</button></Link>
                                <Link><button className="btn btn-info btn-outline px-5 mt-3"><MdOutlineEdit /> Update</button></Link>
                                <button
                                    onClick={() => {
                                        setIsOpen(true);
                                        setSelectedId(course._id);
                                    }}
                                    className="btn btn-error btn-outline px-5 mt-3"
                                ><MdDelete /> Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                <DeleteModal handleDelete={handleDelete} id={selectedId} isOpen={isOpen} closeModal={closeModal} />
            </div>
        </div>
    );
};

export default MyClasses;
