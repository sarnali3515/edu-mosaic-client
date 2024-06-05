import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";


const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { coursePayment, user } = useAuth();
    console.log(coursePayment);
    const price = coursePayment.price;
    const navigate = useNavigate();



    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                console.log((res.data.clientSecret));
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price])

    const { mutateAsync } = useMutation({
        mutationFn: async (payment) => {
            const { data } = await axiosSecure.post(`/enroll-class`, payment);
            return data;
        },
        onSuccess: (data) => {
            console.log('Enrolled Successfully', data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class Enrolled Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-classes')
        },
        onError: () => {
            // console.log(errors);
        }
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('Payment Method', paymentMethod);
            setError('')
        }

        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error', confirmError);
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);


                try {
                    const payment = {
                        email: user.email,
                        name: user.displayName,
                        title: coursePayment.title,
                        teacherName: coursePayment.teacherName,
                        photo: coursePayment.photo,
                        price: coursePayment.price,
                        classId: coursePayment._id,
                        transactionId: paymentIntent.id,
                        date: new Date(),
                        status: 'Pending'
                    }
                    console.table(payment);
                    // post
                    await mutateAsync(payment)

                } catch (err) {
                    console.error(err)
                }

                navigate('/dashboard/enroll-class')
            }
        }
    }

    return (
        <div className="max-w-2xl md:mt-16 p-10 mx-auto border rounded-xl bg-purple-200">

            <form onSubmit={handleSubmit}>
                <CardElement
                    className="border p-3 bg-white"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <p className="text-red-600">{error}</p>
                {
                    transactionId && <p className="border border-purple-400 rounded-lg text-center mt-2 text-green-600">Payment Successful! <br /> Your Transaction Id is : <span className="font-semibold">{transactionId}</span></p>
                }
                <div className="flex items-center justify-center pt-10">
                    <button className="btn btn-sm bg-purple-600 text-white" type="submit" disabled={!stripe || !clientSecret}>
                        Pay Now
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CheckoutForm;