import { Link, NavLink } from "react-router-dom";
import './Navbar.css'
import { RiLogoutCircleLine } from "react-icons/ri";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { FiLogIn } from "react-icons/fi";


const Navbar = () => {
    const { user, logOut, loading } = useAuth()

    const handleSignOut = () => {
        logOut()
            .then(
                result => {
                    console.log(result)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Logout Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            )
            .catch();
    };
    if (loading) {
        return (
            <div className="text-center my-4 md:my-6">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    const navLinks =
        <>
            <li className="text-base font-medium"><NavLink to="/"> Home</NavLink></li>
            <li className="text-base font-medium"><NavLink to="/courses">All Classes</NavLink></li>
            <li className="text-base font-medium"><NavLink to="/teach-on">Teach on EduMosaic</NavLink></li>
        </>
    return (
        <div className="max-w-screen-xl mx-auto bg-white">
            <div className="navbar max-w-screen-xl fixed z-10  bg-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className=" ml-0 pl-0 "><img className="h-6  lg:h-12" src="https://i.ibb.co/zNF0bYr/edum-main.png" alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <>
                            <div className="dropdown z-10 dropdown-hover dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full" title={user.displayName}>
                                        <img alt={user.displayName} src={user.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content space-y-2 z-[1] menu shadow bg-base-100 rounded-box w-56">
                                    <li><button className="btn bg-purple-500 text-white">{user.displayName}</button></li>
                                    <Link to="/dashboard"><li><button className="btn bg-purple-500 text-white">Dashboard</button></li></Link>
                                    <li><button onClick={handleSignOut} className="btn bg-purple-500 text-white"><RiLogoutCircleLine></RiLogoutCircleLine>Log Out</button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>

                            <Link to="/login" className="font-semibold hover:underline hover:text-purple-600 md:mr-6">Login</Link>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;