import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TeachOn = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data: userData = {}, isLoading: userLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`);
            return data;
        }
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (teacherReqData) => {
            const { data } = await axiosSecure.post(`/teacher-req`, teacherReqData);
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Request Submitted Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
        },
        onError: () => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    const onSubmit = async (data) => {
        const name = data.name;
        const email = user?.email;
        const image = data.image;
        const title = data.title;
        const experience = data.experience;
        const category = data.category;
        const status = 'Pending';

        try {
            const teacherReqData = {
                name, email, image, title, experience, category, status
            };
            await mutateAsync(teacherReqData);
        } catch (err) {
            console.error(err);
        }
    }

    if (loading || userLoading) {
        return (
            <div className="text-center my-4 md:my-6">
                <span className="loading loading-lg loading-spinner text-success"></span>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>EduMosaic - Teach on EduMosaic</title>
            </Helmet>
            <div className="hero py-10 bg-purple-200 min-h-screen">
                <div className="card w-full max-w-2xl border border-purple-600 mx-auto">
                    <h2 className="text-3xl text-center font-bold mt-8">Apply for Teaching</h2>
                    <div className="card-body">
                        {userData.role === 'teacher' ? (
                            <div className="text-center">
                                <p className="text-xl font-semibold text-green-600">
                                    You are already registered as a teacher!
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">Name</label>
                                    <input defaultValue={user?.displayName}
                                        type="text"
                                        {...register('name', { required: true })}
                                        placeholder="Enter your name"
                                        className="input input-bordered"
                                    />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">Image</label>
                                    <input
                                        defaultValue={user?.photoURL}
                                        type="text"
                                        {...register('image', { required: true })}
                                        placeholder="Enter image URL"
                                        className="input input-bordered"
                                    />
                                    {errors.image && <span className="text-red-600">Image is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">Email</label>
                                    <input
                                        type="email"
                                        defaultValue={user?.email}
                                        readOnly
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">Experience</label>
                                    <select
                                        {...register('experience', { required: true })}
                                        className=" select input input-bordered"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select Experience</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="experienced">Experienced</option>
                                        <option value="mid-level">Mid-level</option>
                                    </select>
                                    {errors.experience && <span className="text-red-600">Experience is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">Title</label>
                                    <input
                                        type="text"
                                        {...register('title', { required: true })}
                                        placeholder="Enter your title"
                                        className="input input-bordered"
                                    />
                                    {errors.title && <span className="text-red-600">Title is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">Category</label>
                                    <select
                                        {...register('category', { required: true })}
                                        className="select input input-bordered"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="web development">Web Development</option>
                                        <option value="digital marketing">Digital Marketing</option>
                                        <option value="data science">Data Science</option>
                                        <option value="graphic design">Graphic Design</option>
                                        <option value="project management">Project Management</option>
                                    </select>
                                    {errors.category && <span className="text-red-600">Category is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn bg-purple-600 text-white">Submit for Review</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeachOn;
