import { RiLogoutCircleLine } from "react-icons/ri";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import Swal from "sweetalert2";


const DashboardNav = () => {
    const { user, logOut } = useAuth();
    const [role] = useRole()
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
    return (
        <div className="navbar bg-purple-200">

            <div className="navbar-start md:ml-5">
                <h2 className="text-lg md:text-xl font-bold uppercase">{role} Dashboard</h2>
            </div>
            <div className="navbar-end md:mr-8">
                <div className="mr-3">
                    <h2 className="text-sm font-semibold">{user.displayName}</h2>
                    <p className="text-xs text-end ">{role}</p>
                </div>
                <div className="dropdown z-10 dropdown-hover dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full" title={user.displayName}>
                            <img alt={user.displayName} src={user.photoURL} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content space-y-2 z-[1] menu shadow bg-base-100 rounded-box w-56">
                        <li><button className="btn bg-purple-500 text-white">{user.displayName}</button></li>

                        <li><button onClick={handleSignOut} className="btn bg-purple-500 text-white"><RiLogoutCircleLine></RiLogoutCircleLine>Log Out</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;