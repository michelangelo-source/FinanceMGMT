import {Link} from "react-router-dom";

export const Navbar=()=>{

    return (
        <div>
            <Link to={"/"}> Raport</Link>
            <Link to={"/"}> Cele oszczednosciowe</Link>
            <Link to={"/"}> historia finansow</Link>
            <Link to={"/"}> moje kotno</Link>
            <Link to={"/"}> wyloguj</Link>
        </div>
    )

}