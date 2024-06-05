import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import DashboardNav from "../pages/Dashboard/DashboardNav/DashboardNav";


const Dashboard = () => {
    return (
        <div className="relative min-h-screen md:flex">

            {/* sidebar */}

            <div>
                <Sidebar></Sidebar>
            </div>


            {/* outlet */}
            <div className="flex-1 md:ml-64">
                <div>
                    <DashboardNav></DashboardNav>
                </div>
                <div className="p-5">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;