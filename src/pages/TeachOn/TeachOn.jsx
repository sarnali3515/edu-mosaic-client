import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';


const TeachOn = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    };


    return (
        <div>
            <Helmet>
                <title>EduMosaic - Teach on EduMosaic</title>
            </Helmet>
            <div className="hero py-10 bg-purple-200">
                <div className="card w-full max-w-2xl border border-purple-600 mx-auto">
                    <h2 className="text-3xl text-center font-bold mt-8">Apply for Teaching</h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">Name</label>
                                <input
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeachOn;

