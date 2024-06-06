import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";


const AdminClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()


    const { data: evaluations = [] } = useQuery({
        queryKey: ['evaluations', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/evaluations/${id}`);
            console.log(data);
            return data;
        }
    });

    return (
        <div className="space-y-8">
            {
                evaluations.map(evaluation =>
                    <div key={evaluation._id} className='relative mt-5'>
                        <div className="card w-full h-48 bg-[#D5CAEB]">
                            <div className="card-body">
                                <p>{evaluation.description}</p>
                                <Rating
                                    readonly
                                    initialRating={evaluation.rating}
                                    emptySymbol={<FaRegStar color="#d6ab3c" size={24} />}
                                    fullSymbol={<FaStar color="#d6ab3c" size={24} />}
                                />
                                <div className='flex gap-4'>
                                    <div className="avatar">
                                        <div className="w-10 md:w-14 rounded-full">
                                            <img src={evaluation.studentPhoto} />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">{evaluation.studentName}</h2>
                                        <p className='text-sm'>Student of {evaluation.classTitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img className='absolute -top-6 right-4 w-12 h-12' src="https://i.ibb.co/BjPc9Tg/icons8-get-quote-94.png" alt="" />
                    </div>
                )
            }
        </div>
    );
};

export default AdminClassDetails;