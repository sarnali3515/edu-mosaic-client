import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";


const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-200px)] max-w-screen-xl mx-auto pt-20'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default Main;