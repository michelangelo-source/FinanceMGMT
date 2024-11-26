import {Navbar} from "../../Layout/Navbar.tsx";
import bgIMG from '../../../assets/mainBG2.webp'
import {useEffect, useState} from "react";
import {Balance} from "./MainPageAPi/MainPage.ts";

export const MainPage =  () => {
    const [balance, setBalance] = useState<number>();
    const actualBalance =async () => {
        const balance = await Balance();
        setBalance(balance.balance);
    };
    useEffect(() => {
        actualBalance().then();
    }, [])


    return (
        <>
            <div style={{backgroundImage: `url(${bgIMG})`}}
                 className=' flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center'>
                <Navbar ActivePage='Main page'/>


                <div className='flex flex-col lg:flex-row h-4/5 w-4/5 lg:w-2/3 rounded-lg text-cyan-600
            bg-white bg-opacity-80'>
                    <div className='flex flex-col h-full w-full lg:w-5/12 bg-opacity-60'>
                        <div
                            className=' relative bg-cyan-600  text-white bg-opacity-60 text-4xl rounded-lg h-32 p-6 m-5'>
                            Balance:
                            <div className='absolute bottom-0 right-0 m-4'>{balance}</div>
                        </div>
                        <div className='bg-cyan-600 flex-grow text-white bg-opacity-60  text-4xl rounded-lg  p-6 m-5'>
                            Saving goals:
                        </div>
                    </div>
                    <div
                        className='flex flex-col flex-grow bg-cyan-600  text-white bg-opacity-60 rounded-lg  text-4xl p-6 m-5'>
                        Hisotry:
                    </div>
                </div>


            </div>
        </>
    )

}