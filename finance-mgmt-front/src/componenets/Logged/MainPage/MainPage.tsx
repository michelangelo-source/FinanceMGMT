import {Navbar} from "../../Layout/Navbar.tsx";
import bgIMG from '../../../assets/mainBG2.webp'
import {useEffect, useState} from "react";
import {getBalance} from "./MainPageAPi/MainPage.ts";
import {getHistory, Transaction} from "../AccountHistory/hisotryApi/HistoryApi.ts";
import {classNames} from "../../../globalFun/clasnameConnector.ts";
import {Button} from "@headlessui/react";
import {useNavigate} from "react-router-dom";

export const MainPage = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState<number>();
    const [history, setHistory] = useState<Transaction[]>();
    const [hover, setHover] = useState<boolean[]>();
    useEffect(() => {

        getBalance().then((response) => {

            setBalance(response.balance)
        });
        getHistory().then((response) => {
            setHistory(response)
        })


    }, [])
    useEffect(() => {

        if (history)
            setHover(Array(history.length).fill(false));

    }, [history])

    const newTransaction = () => {
        navigate("/transaction")
    }
    const mouseIn = (index: number) => {
        if (hover && history) {
            const newHover = Array(history.length).fill(false)
            newHover[index] = true
            setHover(newHover)
        }
    }
    const mouseOver = () => {
        if (hover&& history) {
            const newHover=Array(history.length).fill(false)

            setHover(newHover)
        }
    }
    return (
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
                    <div className='flex flex-row items-center justify-center'>
                        <Button onClick={newTransaction}>New transaction</Button>
                    </div>
                    <div className='bg-cyan-600 flex-grow text-white bg-opacity-60  text-4xl rounded-lg  p-6 m-5'>
                        Saving goals:
                    </div>
                </div>
                <div
                    className='flex flex-col flex-grow bg-cyan-600  text-white bg-opacity-60 rounded-lg  text-4xl p-6 m-5'>
                    History:
                    <ul>
                        {history ? history.map((item, index) => (

                                <li key={index} onMouseEnter={() => mouseIn(index)}
                                    onMouseLeave={() => mouseOver()}
                                    className="text-lg flex flex-col justify-between items-center p-2 border-b border-gray-300">
                                    <div className={''}>
                                    <span
                                        className={classNames(item.amount > 0 ? 'text-green-700' : 'text-red-800', "font-medium w-1/4")}>{item.amount}</span>
                                    <span className=" w-1/4">{item.title}</span>
                                    <span
                                        className='w-1/4'>{(Number(item.amountBefore) + Number(item.amount)) % 1 == 0 ? Number(item.amountBefore) + Number(item.amount) + ".00" : (Number(item.amountBefore) + Number(item.amount)).toFixed(2)}</span>
                                    <span className="text-sm text-gray-500 w-1/4">
                                      {new Date(item.createdAt).toLocaleString('pl-PL', {
                                          day: 'numeric',
                                          month: '2-digit',
                                          year: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                      })}
                                </span>
                                </div>
                                    {(hover && hover[index]) ? (
                                        <div className="text-sm text-gray-500 w-1/4">{item.description}</div>) : null}
                                </li>



                        )) : null}
                    </ul>
                </div>
            </div>
        </div>
    )
}