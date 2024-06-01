import { Link } from "react-router-dom";


const JoinAsTeacher = () => {
    return (

        <section className="flex flex-col md:flex-row items-center justify-between   my-14">
            <div className="md:w-2/5 ">
                <img
                    // src="https://i.ibb.co/DrgV42C/teach-online-2-1.jpg"
                    src="https://i.ibb.co/Y7JmScd/teach-online-2-1-removebg-preview.png"
                    alt="Join as a Teacher"
                    className="rounded-lg pl-12"
                />
            </div>
            <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-semibold mb-4">Join Us as a Teacher</h2>
                <p className="text-lg mb-6">
                    Share your knowledge and expertise with students around the world.
                    Be part of a growing community of educators and help shape the future of education.
                </p>
                <Link to="/teach-on" className="btn bg-purple-500 px-6 py-3 text-white rounded-lg">
                    Start Teaching Today
                </Link>
            </div>
        </section>

    );
};

export default JoinAsTeacher;