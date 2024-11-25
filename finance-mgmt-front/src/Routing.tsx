import {RouteObject, useRoutes} from 'react-router-dom'
import {Login} from "./componenets/NotLoggedPages/LoginPage/Login.tsx";
import {Register} from "./componenets/NotLoggedPages/RegisterPage/Register.tsx";
import {StartPage} from "./componenets/NotLoggedPages/IndexPage/StartPage.tsx";
import {MainPage} from "./componenets/MainPage/MainPage.tsx";
import {userIsLogged} from "./hooks/userIsLogged.ts";

const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <StartPage/>,
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: '*',
        element: <StartPage/>
    }
]
const privateRoutes: RouteObject[] = [
    {
        path: "/mainPage",
        element: <MainPage/>
    },
    {
        path: '*',
        element: <MainPage/>
    }

]
export const Routing = () => {
    const isLogged = userIsLogged();
    const routes = isLogged ? privateRoutes : publicRoutes;
    return useRoutes(routes);
}