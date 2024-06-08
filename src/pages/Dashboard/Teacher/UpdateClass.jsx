import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateClass = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: classData, isLoading, refetch } = useQuery({
        queryKey: ['class-details', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/course/${id}`);
            console.log(data);
            return data;
        },
        onSuccess: (data) => {
            // Pre-fill the form fields with the existing data
            setValue('title', data.title);
            setValue('price', data.price);
            setValue('photo', data.photo);
            setValue('description', data.description);
        }
    });

    const onSubmit = async (data) => {
        const updatedClassData = {
            ...data,
            teacherName: user?.displayName,
            teacherEmail: user?.email,
            status: classData.status
        };

        try {
            const response = await axiosSecure.put(`/my-classes/update/${id}`, updatedClassData);
            if (response.data) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Class Updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch()
                navigate('/dashboard/my-classes');
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) {
        return <div className="text-center my-10 md:my-20">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    return (
        <div>
            <Helmet>
                <title>EduMosaic - Update Class</title>
            </Helmet>
            <div className="bg-purple-200 rounded-lg shadow-lg p-8 md:m-5 w-full md:w-11/12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Class</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="form-control">
                        <label className="label text-gray-700">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: true })}
                            defaultValue={classData.title}
                            placeholder="Enter class title"
                            className="input input-bordered w-full rounded-md border-gray-300"
                            required
                        />

                    </div>
                    <div className="form-control">
                        <label className="label text-gray-700">Price</label>
                        <input
                            type="number"
                            {...register('price', { required: true })}
                            defaultValue={classData.price}
                            placeholder="Enter class price"
                            className="input input-bordered w-full rounded-md border-gray-300"
                            required
                        />

                    </div>
                    <div className="form-control">
                        <label className="label text-gray-700">Name</label>
                        <input
                            type="text"
                            value={user?.displayName}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 rounded-md border-gray-300"

                        />
                    </div>
                    <div className="form-control">
                        <label className="label text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 rounded-md border-gray-300"

                        />
                    </div>
                    <div className="form-control col-span-1 md:col-span-2">
                        <label className="label text-gray-700">Description</label>
                        <textarea
                            {...register('description', { required: true })}
                            defaultValue={classData.description}
                            placeholder="Enter class description"
                            className="textarea textarea-bordered w-full rounded-md border-gray-300"
                            required
                        ></textarea>

                    </div>
                    <div className="form-control col-span-1 md:col-span-2">
                        <label className="label text-gray-700">Image</label>
                        <input
                            type="text"
                            defaultValue={classData.photo}
                            {...register('photo', { required: true })}
                            placeholder="Enter image URL"
                            className="input input-bordered w-full rounded-md border-gray-300"
                            required
                        />

                    </div>
                    <div className="form-control col-span-1 md:col-span-2 mt-6">
                        <button type="submit" className="btn bg-gradient-to-r from-purple-400 to-purple-600 text-white w-full rounded-md py-2">
                            Update Class
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateClass;
