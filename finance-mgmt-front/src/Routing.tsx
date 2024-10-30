import {RouteObject, useRoutes} from 'react-router-dom'
import {ErrorPage} from "./error/ErrorPage.tsx";
import {Login} from "./componenets/Login.tsx";
import {Register} from "./componenets/Register.tsx";
import {StartPage} from "./componenets/StartPage.tsx";
import {MainPage} from "./componenets/MainPage.tsx";


const routes: RouteObject[] = [
    {
        path: '/',
        element: <StartPage/>,
    }, {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path:"/mainPage",
        element:<MainPage/>
    },

    {
        path: '*',
        element: <ErrorPage/>
    }

]
export const Routing = () => {
    return useRoutes(routes);
}