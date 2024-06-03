

const MyEnrolledClass = () => {
    return (
        <div>
            <h2 className="text-3xl text-center font-bold mb-5">My Enrolled Classes</h2>
            <div className="grid gap-8  md:grid-cols-3">
                <div className="card w-full bg-base-100 shadow-xl">
                    <figure><img className="h-64 w-full" src="https://i.ibb.co/HK5cBkZ/teach-online-2-1.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Graphics Design</h2>
                        <p className="text-sm">Instructed by <span className="font-semibold">Maria Olivia</span></p>
                        <div className="card-actions justify-end">
                            <button className="btn bg-purple-600 text-white btn-sm">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEnrolledClass;