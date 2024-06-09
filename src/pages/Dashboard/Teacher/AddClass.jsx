import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const AddClass = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const { mutateAsync } = useMutation({
        mutationFn: async (classData) => {
            const { data } = await axiosSecure.post(`/courses`, classData);
            return data;
        },
        onSuccess: (data) => {
            console.log('Data Saved Successfully', data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class Added Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-classes')

        },
        onError: () => {
            // console.log(errors);
        }
    })


    const onSubmit = async (data) => {
        console.log(data);
        const title = data.title
        const price = data.price
        const photo = data.photo
        const description = data.description
        const teacherName = user?.displayName
        const teacherEmail = user?.email
        const totalEnrollment = 0
        const status = 'Pending'

        try {
            const classData = {
                title, price, photo, description, teacherName, teacherEmail, status, totalEnrollment
            }
            console.table(classData);
            // post
            await mutateAsync(classData)

        } catch (err) {
            console.error(err)
        }


    };

    return (
        <div >
            <Helmet>
                <title>EduMosaic - Add Class</title>
            </Helmet>
            <div className="bg-purple-200 rounded-lg shadow-lg p-8 md:m-5 w-full md:w-11/12">
                <h2 className="text-xl md:text-3xl font-bold text-center text-gray-800 mb-8">Add a New Class</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="form-control">
                        <label className="label text-gray-700">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: true })}
                            placeholder="Enter class title"
                            className="input input-bordered w-full rounded-md border-gray-300"
                        />
                        {errors.title && <span className="text-red-600 text-sm">Title is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label text-gray-700">Price</label>
                        <input
                            type="number"
                            {...register('price', { required: true })}
                            placeholder="Enter class price"
                            className="input input-bordered w-full rounded-md border-gray-300"
                        />
                        {errors.price && <span className="text-red-600 text-sm">Price is required</span>}
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
                            placeholder="Enter class description"
                            className="textarea textarea-bordered w-full rounded-md border-gray-300"
                        ></textarea>
                        {errors.description && <span className="text-red-600 text-sm">Description is required</span>}
                    </div>
                    <div className="form-control col-span-1 md:col-span-2">
                        <label className="label text-gray-700">Image</label>
                        <input
                            type="text"
                            {...register('photo', { required: true })}
                            placeholder="Enter image URL"
                            className="input input-bordered w-full rounded-md border-gray-300"
                        />
                        {errors.image && <span className="text-red-600 text-sm">Image is required</span>}
                    </div>
                    <div className="form-control col-span-1 md:col-span-2 mt-6">
                        <button type="submit" className="btn bg-gradient-to-r from-purple-400 to-purple-600 text-white w-full rounded-md py-2">
                            + Add Class
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;
