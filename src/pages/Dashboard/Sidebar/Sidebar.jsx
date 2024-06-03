import { useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { CgProfile } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [isActive, setActive] = useState(true)

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
                            {/* Statistics */}
                            <NavLink
                                to='/dashboard'
                                end
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-purple-500   hover:text-purple-950 ${isActive ? 'bg-purple-400  text-purple-950' : 'text-purple-900'
                                    }`
                                }
                            >
                                <CgProfile className='w-5 h-5' />

                                <span className='mx-4 font-medium'>My Profile</span>
                            </NavLink>

                            {/* Add Room */}
                            <NavLink
                                to='add-class'
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-purple-500   hover:text-purple-950 ${isActive ? 'bg-purple-400  text-gray-700' : 'text-purple-900'
                                    }`
                                }
                            >
                                <FaRegAddressCard className='w-5 h-5' />
                                <span className='mx-4 font-medium'>Add Class</span>
                            </NavLink>
                            {/* My Listing */}
                            <NavLink
                                to='my-classes'
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-purple-500   hover:text-purple-950 ${isActive ? 'bg-purple-400  text-gray-700' : 'text-purple-900'
                                    }`
                                }
                            >
                                <SiGoogleclassroom className='w-5 h-5' />

                                <span className='mx-4 font-medium'>My Classes</span>
                            </NavLink>
                        </nav>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Sidebar