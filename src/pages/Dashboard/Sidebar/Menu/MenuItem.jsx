import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const MenuItem = ({ label, address, icon: Icon }) => {
    return (
        <NavLink
            to={address}
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-purple-500   hover:text-purple-950 ${isActive ? 'bg-purple-400  text-purple-950' : 'text-purple-900'
                }`
            }
        >
            <Icon className='w-5 h-5' />

            <span className='mx-4 font-medium'>{label}</span>
        </NavLink>
    )
}
MenuItem.propTypes = {
    label: PropTypes.string,
    address: PropTypes.string,
    icon: PropTypes.elementType,
}

export default MenuItem