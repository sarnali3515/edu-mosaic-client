import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOn from "../pages/TeachOn/TeachOn";
import SignUp from "../pages/Authentication/SignUp";
import Login from "../pages/Authentication/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import ClassDetails from "../pages/ClassDetails/ClassDetails";
import Profile from "../pages/Dashboard/Profile/Profile";
import AddClass from "../pages/Dashboard/Teacher/AddClass";
import MyClasses from "../pages/Dashboard/Teacher/MyClasses";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import TeacherReq from "../pages/Dashboard/Admin/TeacherReq";
import ManageAllClasses from "../pages/Dashboard/Admin/ManageAllClasses";
import MyEnrolledClass from "../pages/Dashboard/Student/MyEnrolledClass";
import Payment from "../pages/Dashboard/Payment/Payment";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UpdateClass from "../pages/Dashboard/Teacher/UpdateClass";
import TeacherClassDetails from "../pages/Dashboard/Teacher/TeacherClassDetails";
import StudentClassDetails from "../pages/Dashboard/Student/StudentClassDetails";
import AdminClassDetails from "../pages/Dashboard/Admin/AdminClassDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/courses',
                element: <AllClasses></AllClasses>
            },
            {
                path: '/teach-on',
                element: <PrivateRoute><TeachOn></TeachOn></PrivateRoute>
            },
            {
                path: '/sign-up',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/courses/:id',
                element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Profile></Profile>
            },

            // teacher
            {
                path: 'add-class',
                element: <AddClass></AddClass>
            },
            {
                path: 'my-classes',
                element: <MyClasses></MyClasses>
            },
            {
                path: 'my-classes/:id',
                element: <UpdateClass></UpdateClass>
            },
            {
                path: 'teacher-class-details/:id',
                element: <TeacherClassDetails></TeacherClassDetails>
            },


            // admin
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'teacher-req',
                element: <TeacherReq></TeacherReq>
            },
            {
                path: 'all-classes',
                element: <ManageAllClasses></ManageAllClasses>
            },
            {
                path: 'all-classes/:id',
                element: <AdminClassDetails></AdminClassDetails>
            },

            // student
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'enroll-class',
                element: <MyEnrolledClass></MyEnrolledClass>
            },
            {
                path: 'enroll-class/:id',
                element: <StudentClassDetails></StudentClassDetails>
            },
        ]
    }
]);