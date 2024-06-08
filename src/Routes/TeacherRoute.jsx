import { Navigate } from 'react-router-dom'
import useRole from '../hooks/useRole'
// import PropTypes from 'prop-types'

const TeacherRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) {
        return <div className="text-center my-10 md:my-20">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if (role === 'teacher') return children
    return <Navigate to='/dashboard' />
}

export default TeacherRoute

// TeacherRoute.propTypes = {
//   children: PropTypes.element,
// }