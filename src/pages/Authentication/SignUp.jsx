import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2'

const SignUp = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        console.log('user info updated');
                        reset();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Sign Up Successful!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(location?.state ? location.state : '/');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
    }

    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="hero py-10 bg-purple-200">
            <Helmet>
                <title>EduMosaic - Sign up</title>
            </Helmet>
            <div className="card w-full max-w-lg border border-purple-600">
                <h2 className="text-3xl text-center font-bold mt-8">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control pt-5 border-t-2 border-purple-400">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} name="name" placeholder="Your Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">* Name is required</span>}
                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} name="email" placeholder="Email Address" className="input input-bordered" />
                        {errors.email && <span className="text-red-600">* Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register("password",
                                    {
                                        required: true,
                                        minLength: 6,

                                        pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,15}$/
                                    })}
                                name="password"
                                placeholder="Password"
                                className="input input-bordered w-full pr-10"

                            />
                            <span
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.password?.type === 'required' && <span className="text-red-600">* Password is required</span>}
                        {errors.password?.type === 'minLength' && <span className="text-red-600">* Password must be 6 characters</span>}
                        {errors.password?.type === 'pattern' && <span className="text-red-600">* Password must have one uppercase, one lowercase</span>}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register("photo", { required: true })} name="photo" placeholder="Photo URL" className="input input-bordered" required />
                            {errors.photo && <span className="text-red-600">* Photo URL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="text" {...register("phone", { required: true })} name="phone" placeholder="Phone Number" className="input input-bordered" required />
                            {errors.phone && <span className="text-red-600">* Phone is required</span>}
                        </div>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control w-32 md:w-44 mx-auto mt-6">
                        <input className="btn bg-purple-600 text-white rounded-none hover:bg-purple-500" type="submit" value="Sign Up" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 lg:w-1/3 border-b border-purple-400"></span>
                        <a href="#" className="text-sm text-center hover:underline">Or continue with</a>
                        <span className="w-1/5 lg:w-1/3 border-b border-purple-400"></span>
                    </div>
                </form>
                <div className="flex justify-center space-x-4 mb-8">
                    <button title="Google" className="hover:bg-purple-300 rounded-full flex items-center">
                        <svg className="w-8 h-8 mx-2" viewBox="0 0 40 40">
                            <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                            <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                            <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                            <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                        </svg>
                    </button>
                    <button title="Facebook" className="hover:bg-purple-300 rounded-full flex items-center">
                        <svg className="w-12 h-9 mx-2" viewBox="0 0 32 32">
                            <path d="M16 3.125C8.91 3.125 3.125 8.91 3.125 16 3.125 22.09 7.57 27.292 13.35 28.45V20.1H10.26V16h3.09v-3.1c0-3.06 1.8-4.78 4.56-4.78 1.32 0 2.7.23 2.7.23v2.98H18.45c-1.49 0-1.96.93-1.96 1.88V16H20l-.51 4.1h-3.04V28.45c5.78-1.16 10.22-6.36 10.22-12.45 0-7.09-5.785-12.875-12.875-12.875z" fill="#3b5998" />
                        </svg>
                    </button>
                </div>
                <p className='text-center pb-5'><small>Already have an Account? <Link className='text-blue-700 hover:underline' to="/login">Login now.</Link></small></p>
            </div>
        </div>
    );
};

export default SignUp;