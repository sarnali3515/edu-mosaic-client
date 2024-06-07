import { useState } from 'react';
import Swal from 'sweetalert2';

const SubscribeNewsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your subscription logic here
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Subscribed successfully!',
            showConfirmButton: false,
            timer: 1500
        });
        setEmail('');
    };

    return (
        <div className=" flex justify-between bg-purple-200 items-center p-12 border-4 rounded-lg border-purple-400 my-6">
            <div className="p-6  rounded-lg">
                <h2 className="text-3xl font-bold uppercase text-purple-900 mb-4">Subscribe to our Newsletter</h2>
                <p className=" text-gray-600 mb-6">Get the latest updates and offers directly in your inbox.</p>

            </div>
            <div >
                <form onSubmit={handleSubmit} className="items-center gap-4">
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Email Address:</span>
                    </label>
                    <div className="join">
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required className="input input-bordered join-item w-full p-3 border border-purple-300 rounded focus:outline-none focus:border-purple-500" />
                        <button type="submit" className="btn btn-primary join-item w-full sm:w-auto px-6 py-3 bg-purple-700 text-white font-semibold rounded hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubscribeNewsletter;
