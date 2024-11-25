import {Navbar} from "../Layout/Navbar.tsx";
import bgIMG from '../../assets/mainBG2.webp'

export const MainPage = () => {
    return (
<>

        <div style={{backgroundImage: `url(${bgIMG})`}}

             className=' flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center'>
            <Navbar  />
            <div className='flex flex-row h-2/3 w-2/3 rounded-xl text-cyan-600
            bg-white bg-opacity-60'>
                <div className='flex flex-col h-full w-1/3 bg-opacity-60'>
                <div className='bg-cyan-600  text-white bg-opacity-60 text-4xl rounded-xl h-1/3 p-6 m-5'>
                    Balance:

                </div>
                <div className='bg-cyan-600  text-white bg-opacity-60  text-4xl rounded-xl h-2/3 p-6 m-5'>
                    Saving goals:
                </div>
            </div>
                <div className='flex flex-col flex-grow bg-cyan-600  text-white bg-opacity-60 rounded-xl  text-4xl p-6 m-5'>
                    Hisotry:
                </div>
            </div>


        </div>
</>
    )

}