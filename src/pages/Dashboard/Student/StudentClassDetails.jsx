import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const StudentClassDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const { data: enrollClass = [] } = useQuery({
        queryKey: ['enroll-class', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/enrollment/${id}`);
            // console.log(data);
            return data;
        }

    });
    // console.log(enrollClass.classId);

    const { data: classEnrollment } = useQuery({
        queryKey: ['class-enrollment', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/enrolled-class/${id}`);
            return data;
        }
    });

    const { data: classAssignments = [], isLoading } = useQuery({
        queryKey: ['class-assignment', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assignments/${classEnrollment.classId}`);
            return data;
        },
        enabled: !!classEnrollment
    });

    // evaluation post
    const { mutateAsync: submitEvaluation } = useMutation({
        mutationFn: async (evaluationData) => {
            const { data } = await axiosSecure.post(`/evaluations`, evaluationData);
            console.log(data);
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Evaluation Added Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
        },
        onError: () => {
            // Handle error
        }
    });

    const handleCreateClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const onSubmit = async (data) => {
        const description = data.description;
        const classId = enrollClass.classId;
        const studentName = user?.displayName;
        const studentPhoto = user?.photoURL;
        const classTitle = enrollClass?.title;

        try {
            const evaluationData = {
                description,
                rating,
                classId,
                studentName,
                classTitle,
                studentPhoto

            };
            await submitEvaluation(evaluationData);
        } catch (err) {
            console.error(err);
        }
        setIsModalOpen(false);
        reset();
    };


    // assignment submission post
    const { mutateAsync: submitAssignment } = useMutation({
        mutationFn: async (assignmentSubData) => {
            const { data } = await axiosPublic.post(`/submit-assignment`, assignmentSubData);
            return data;
        },
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Assignment Submitted Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
        },
        onError: () => {
            // Handle error
        }
    });

    const handleAssignmentSubmit = async (assignmentClassId) => {
        try {
            const newDate = new Date();
            const submissionDate = newDate.toISOString().split('T')[0];
            console.log(submissionDate);

            const assignmentSubData = {
                assignmentClassId,
                submissionDate: submissionDate
            };
            await submitAssignment(assignmentSubData);
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center my-4 md:my-6">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <button onClick={handleCreateClick} className="btn w-1/4 text-base font-bold flex item-center justify-center border border-purple-800 border-dashed mt-5 mb-8 text-purple-800 bg-purple-400 md:ml-12">Add Teaching Evaluation</button>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl">
                        <h2 className="text-2xl mb-4">Teaching Evaluation</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <input
                                    type="text"
                                    {...register('description', { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Rating</label>
                                <Rating
                                    initialRating={rating}
                                    emptySymbol={<FaRegStar color="#ffd700" size={24} />}
                                    fullSymbol={<FaStar color="#ffd700" size={24} />}
                                    onChange={handleRatingChange}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={handleCloseModal} className="btn bg-purple-600 text-white">Cancel</button>
                                <button type="submit" className="btn bg-purple-600 text-white">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto shadow-md md:mx-12">
                <table className="table">
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
                        {classAssignments?.map((classAssignment, idx) =>
                            <tr key={classAssignment._id}>
                                <th>{idx + 1}</th>
                                <td>{classAssignment.assignmentTitle}</td>
                                <td>{classAssignment.assignmentDescription}</td>
                                <td>{classAssignment.assignmentDeadline}</td>
                                <th>
                                    <button onClick={() => handleAssignmentSubmit(classAssignment.classId)} className="btn btn-xs bg-purple-500 text-white">Submit</button>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
                {classAssignments?.length === 0 && <p className="py-5 text-center text-lg">No Assignment added yet.</p>}
            </div>
        </div>
    );
};

export default StudentClassDetails;
