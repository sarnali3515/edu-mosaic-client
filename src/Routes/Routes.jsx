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
import TeacherRoute from "./TeacherRoute";
import AdminRoute from "./AdminRoute";

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
                element: <PrivateRoute><TeacherRoute><AddClass></AddClass></TeacherRoute></PrivateRoute>
            },
            {
                path: 'my-classes',
                element: <PrivateRoute><TeacherRoute><MyClasses></MyClasses></TeacherRoute></PrivateRoute>

            },
            {
                path: 'my-classes/:id',
                element: <PrivateRoute><TeacherRoute><UpdateClass></UpdateClass></TeacherRoute></PrivateRoute>

            },
            {
                path: 'teacher-class-details/:id',
                element: <PrivateRoute><TeacherRoute> <TeacherClassDetails></TeacherClassDetails></TeacherRoute></PrivateRoute>

            },


            // admin
            {
                path: 'all-users',
                element: <PrivateRoute><AdminRoute><AllUsers></AllUsers></AdminRoute></PrivateRoute>
            },
            {
                path: 'teacher-req',
                element: <PrivateRoute><AdminRoute><TeacherReq></TeacherReq></AdminRoute></PrivateRoute>
            },
            {
                path: 'all-classes',
                element: <PrivateRoute><AdminRoute><ManageAllClasses></ManageAllClasses></AdminRoute></PrivateRoute>

            },
            {
                path: 'all-classes/:id',
                element: <PrivateRoute><AdminRoute><AdminClassDetails></AdminClassDetails></AdminRoute></PrivateRoute>

            },

            // student
            {
                path: 'payment',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: 'enroll-class',
                element: <PrivateRoute><MyEnrolledClass></MyEnrolledClass></PrivateRoute>
            },
            {
                path: 'enroll-class/:id',
                element: <PrivateRoute><StudentClassDetails></StudentClassDetails></PrivateRoute>
            },
        ]
    }
]);