import CountUp from "react-countup";


const WebsiteStats = () => {
    return (

        <div className="my-10">
            <h2 className='text-4xl mb-6 font-semibold text-center'>EduMosaic at a Glance</h2>
            <div className="flex flex-col gap-5 md:flex-row items-center justify-between p-8 rounded-lg shadow-lg bg-[#D5CAEB] ">
                {/* Statistics */}
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <div className=" p-6 rounded-lg text-center">
                        <h3 className="text-2xl font-semibold">Total Users</h3>
                        <p className="text-4xl font-bold text-blue-500 mt-2"><CountUp end={150} duration={6} />+</p>

                    </div>
                    <div className=" p-6 rounded-lg text-center">
                        <h3 className="text-2xl font-semibold">Total Classes</h3>
                        <p className="text-4xl font-bold text-green-500 mt-2"><CountUp end={200} duration={6} />+</p>

                    </div>
                    <div className=" p-6 rounded-lg text-center">
                        <h3 className="text-2xl font-semibold">Total Enrollments</h3>
                        <p className="text-4xl font-bold text-purple-500 mt-2"><CountUp end={100} duration={6} />+</p>
                    </div>
                </div>
                {/* photo */}
                <div className="w-full md:w-2/5 mt-8 md:mt-0">
                    <img src="https://i.ibb.co/nnrGT6n/stats.jpg" alt="Relevant Image" className="rounded-lg shadow-md w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default WebsiteStats;

