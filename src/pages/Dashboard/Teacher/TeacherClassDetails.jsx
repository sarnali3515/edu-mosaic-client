import { useState } from 'react';
import { useForm } from 'react-hook-form';
import img1 from '../../../assets/icons/icons-enroll.png';
import img2 from '../../../assets/icons/icons-assignment.png';
import img3 from '../../../assets/icons/icons-calendar.png';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const TeacherClassDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async (assignmentData) => {
            const { data } = await axiosSecure.post(`/assignments`, assignmentData);
            return data;
        },
        onSuccess: (data) => {
            console.log('Data Saved Successfully', data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Assignment Added Successfully!",
                showConfirmButton: false,
                timer: 1500
            });

        },
        onError: () => {
            // console.log(errors);
        }
    })

    const { data: classAssignments } = useQuery({
        queryKey: ['class-assignments', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assignments/${id}`);
            console.log(data);
            return data;
        }
    });
    const { data: classEnrollments } = useQuery({
        queryKey: ['class-enrollments', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/enrollments/${id}`);
            console.log(data);
            return data;
        }
    });
    // const { data: perDaySubmissions } = useQuery({
    //     queryKey: ['submit-assignment', id],
    //     queryFn: async () => {
    //         const { data } = await axiosSecure.get(`/submit-assignment/${id}`);
    //         console.log(data);
    //         return data;
    //     }
    // });

    const newDate = new Date();
    const submissionDate = newDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    console.log(submissionDate);

    const { data: perDaySubmission } = useQuery({
        queryKey: ['submit-day', submissionDate],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/submit-day/${submissionDate}`);
            console.log(data);
            return data;
        }
    });

    const totalAssignment = classAssignments?.length
    const totalEnrollment = classEnrollments?.length
    const submissionPerDay = perDaySubmission?.length


    const handleCreateClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const onSubmit = async (data) => {
        // Handle the assignment submission here
        const assignmentTitle = data.assignmentTitle
        const assignmentDeadline = data.assignmentDeadline
        const assignmentDescription = data.assignmentDescription
        const classId = id
        console.log(classId);


        try {
            const assignmentData = {
                assignmentTitle,
                assignmentDeadline,
                assignmentDescription,
                classId
            }
            console.table(assignmentData);
            // post
            await mutateAsync(assignmentData)

        } catch (err) {
            console.error(err)
        }
        // Close the modal after submission

        setIsModalOpen(false);
        reset();
    };

    return (
        <div>
            <h2>Teacher Class Details</h2>
            <h2 className='text-3xl text-center font-semibold mb-4'>Class Progress</h2>
            <div className="md:flex gap-5 border py-5 px-4 md:px-16 bg-purple-200 rounded-lg">
                <div className="w-full border bg-white rounded-lg py-6">
                    <div className='flex items-center justify-center'>
                        <img className='w-10' src={img1} alt="" />
                    </div>
                    <h2 className="text-4xl font-bold text-center">{totalEnrollment}</h2>
                    <h2 className="text-xl font-semibold text-center">Total Enrollment</h2>
                </div>
                <div className="w-full border bg-white rounded-lg py-6">
                    <div className='flex items-center justify-center'>
                        <img className='w-10' src={img2} alt="" />
                    </div>
                    <h2 className="text-4xl font-bold text-center">{totalAssignment}</h2>
                    <h2 className="text-xl font-semibold text-center">Total Assignment</h2>
                </div>
                <div className="w-full border bg-white rounded-lg py-6">
                    <div className='flex items-center justify-center'>
                        <img className='w-10' src={img3} alt="" />
                    </div>
                    <h2 className="text-4xl font-bold text-center">{submissionPerDay}</h2>
                    <h2 className="text-xl font-semibold text-center">Per Day Submission</h2>
                </div>
            </div>

            <button onClick={handleCreateClick} className="btn w-full text-xl font-semibold flex item-center justify-center border border-purple-500 border-dashed mt-5">+ Create Assignment</button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <h2 className="text-2xl mb-4">Create Assignment</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Assignment Title</label>
                                <input
                                    type="text"
                                    {...register('assignmentTitle', { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.assignmentTitle && <p className="text-red-500 text-sm">Assignment Title is required</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Assignment Deadline</label>
                                <input
                                    type="date"
                                    {...register('assignmentDeadline', { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.assignmentDeadline && <p className="text-red-500 text-sm">Assignment Deadline is required</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Assignment Description</label>
                                <textarea
                                    {...register('assignmentDescription', { required: true })}
                                    className="textarea textarea-bordered w-full"
                                ></textarea>
                                {errors.assignmentDescription && <p className="text-red-500 text-sm">Assignment Description is required</p>}
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={handleCloseModal} className="btn bg-purple-600 text-white">Cancel</button>
                                <button type="submit" className="btn bg-purple-600 text-white">Add Assignment</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherClassDetails;
