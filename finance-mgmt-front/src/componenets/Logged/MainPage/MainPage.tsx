import {Navbar} from "../../Layout/Navbar/Navbar.tsx";
import bgIMG from '../../../assets/mainBG2.webp'
import {PieChart} from '@mui/x-charts/PieChart';
import {useEffect, useState} from "react";
import {getBalance} from "./MainPageAPi/MainPage.ts";
import {getHistory, Transaction} from "../AccountHistory/hisotryApi/HistoryApi.ts";
import {Button} from "@headlessui/react";
import {useNavigate} from "react-router-dom";
import {SavingGoal} from "../SavingGoals/SavingGoals.tsx";
import {getSavingGoalsList} from "../SavingGoals/api/savingGoals.ts";
import {HistoryList} from "../../Layout/hisotryList/historyList.tsx";

export const MainPage = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState<number>();
    const [history, setHistory] = useState<Transaction[]>([]);

    const [savingGoals, setSavingGoals] = useState<SavingGoal[]>();
    useEffect(() => {

        getBalance().then((response) => {
            setBalance(response.balance)
        });
        getHistory().then((response) => {
            setHistory(response)
        })
        getSavingGoalsList().then((response) => {
            setSavingGoals(response)
        })

    }, [])


    const newTransaction = () => {
        navigate("/transaction")
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


                        <div>
                            {savingGoals && savingGoals.map((el, index) => (
                                <div key={index} className={'w-full flex flex-row'}>
                                    <p>{el.description}</p>
                                    <PieChart
                                        series={[{
                                            data: [{
                                                id: index,
                                                value: el.balance / el.goal * 100,
                                                color: 'green',
                                                label: el.description
                                            }],
                                            innerRadius: 10,
                                            outerRadius: 14,
                                            startAngle: 0,
                                            endAngle: 360 * el.balance / el.goal,

                                        }]}

                                        slotProps={{legend: {hidden: true}}}
                                        width={50}
                                        height={50}
                                    />
                                    <p>{(el.balance / el.goal * 100).toFixed(2)}%</p>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
                <div
                    className='flex flex-col flex-grow bg-cyan-600  text-white bg-opacity-60 rounded-lg  text-4xl p-6 m-5'>
                    History:
                   <HistoryList history={history}></HistoryList>
                </div>
            </div>
        </div>
    )
}