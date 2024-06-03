import { useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { CgProfile } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUsers } from "react-icons/fa6";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import useRole from '../../../hooks/useRole';
import MenuItem from './Menu/MenuItem';

const Sidebar = () => {
    const [isActive, setActive] = useState(true)
    const [role] = useRole();
    console.log(role);
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-purple-500 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <img
                                // className='hidden md:block'
                                src='https://i.ibb.co/zNF0bYr/edum-main.png'
                                alt='logo'
                                width='100'
                                height='100'
                            />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-purple-400'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-purple-300 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-2 py-2  justify-center items-center mx-auto'>
                            <Link to='/'>
                                <img
                                    // className='hidden md:block'
                                    src='https://i.ibb.co/zNF0bYr/edum-main.png'
                                    alt='logo'
                                    width='150'
                                    height='150'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        {/* Conditional toggle button here.. */}

                        {/*  Menu Items */}
                        <nav>
                            {/* my profile */}
                            <MenuItem label="My Profile" address='/dashboard' icon={CgProfile}></MenuItem>

                            {/* teacher */}
                            {
                                role === 'teacher' &&

                                <>

                                    <MenuItem label="Add Class" address='add-class' icon={FaRegAddressCard}></MenuItem>

                                    <MenuItem label="My Classes" address='my-classes' icon={SiGoogleclassroom}></MenuItem></>

                            }
                            {/* Student */}
                            {
                                role === 'student' &&

                                <>

                                    <MenuItem label="Add Class" address='add-class' icon={FaRegAddressCard}></MenuItem>

                                    <MenuItem label="My Classes" address='my-classes' icon={SiGoogleclassroom}></MenuItem></>

                            }
                            {/* Admin */}
                            {
                                role === 'admin' &&

                                <>

                                    <MenuItem label="Teacher Requests" address='teacher-req' icon={LiaChalkboardTeacherSolid}></MenuItem>

                                    <MenuItem label="All Users" address='all-users' icon={FaUsers}></MenuItem>
                                    <MenuItem label="All Classes" address='all-classes' icon={SiGoogleclassroom}></MenuItem>
                                </>

                            }
                        </nav>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Sidebar