import { Link, NavLink } from "react-router-dom";
import './Navbar.css'


const Navbar = () => {

    const navLinks =
        <>
            <li className="text-base font-medium"><NavLink to="/"> Home</NavLink></li>
            <li className="text-base font-medium"><NavLink to="/all-classes">All Classes</NavLink></li>
            <li className="text-base font-medium"><NavLink to="/teach-on">Teach on EduMosaic</NavLink></li>
        </>
    return (
        <div className="max-w-screen-xl mx-auto">
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
                    <Link to="/" className="btn btn-ghost ml-0 pl-0 "><img className="h-6  lg:h-12" src="https://i.ibb.co/zNF0bYr/edum-main.png" alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Sign In</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;