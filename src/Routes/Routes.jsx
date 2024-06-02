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
                element: <ClassDetails></ClassDetails>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // {
            //     path:'enroll-class',

            // }
        ]
    }
]);