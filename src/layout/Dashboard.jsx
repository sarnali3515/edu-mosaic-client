import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <div className="w-64 min-h-full bg-purple-500 text-white">
                <ul className="menu">
                    <li><NavLink to="/dashboard/user">Dashboard User</NavLink></li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;