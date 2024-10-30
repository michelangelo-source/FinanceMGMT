import {Navbar} from "./Navbar.tsx";
import bgIMG from  '../assets/mainBG.webp'
export const MainPage = () => {
    return (
        <>
        <Navbar/>
        <div style={{backgroundImage: `url(${bgIMG})`}}
                 className='flex flex-col items-center justify-center
                        h-screen w-screen
                        bg-cover bg-center'>

        Stan Konta:
        cyfryy


    </div></>
    )

}