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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
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
        element: <Dashboard></Dashboard>,
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
        ]
    }
]);