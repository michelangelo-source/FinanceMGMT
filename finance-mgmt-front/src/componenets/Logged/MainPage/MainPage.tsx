import {Navbar} from "../../Layout/Navbar/Navbar.tsx";
import bgIMG from '../../../assets/mainBG2.webp'
import {PieChart} from '@mui/x-charts/PieChart';
import {useEffect, useState} from "react";
import {getBalance} from "./MainPageAPi/MainPage.ts";
import {getHistory, Transaction} from "../AccountHistory/hisotryApi/HistoryApi.ts";
import {Link} from "react-router-dom";
import {SavingGoal} from "../SavingGoals/SavingGoals.tsx";
import {getSavingGoalsList} from "../SavingGoals/api/savingGoals.ts";
import {HistoryList} from "../../Layout/hisotryList/historyList.tsx";

export const MainPage = () => {
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
    return (
        <div style={{backgroundImage: `url(${bgIMG})`}}
             className=' flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center'>
            <Navbar ActivePage='Main page'/>
            <div className='flex flex-col lg:flex-row h-4/5 w-4/5 lg:w-2/3 rounded-lg text-cyan-600
            bg-white bg-opacity-80 overflow-auto'>
                <div className='flex flex-col w-full lg:w-5/12 bg-opacity-60'>
                    <div
                        className=' relative bg-cyan-600  text-white bg-opacity-60 text-4xl rounded-lg h-32 p-6 m-5'>
                        Balance:
                        <div className='absolute bottom-0 right-0 m-4'>{balance}</div>
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                        <Link data-cy="newTransaction" to={'/transaction'}>New transaction</Link>
                    </div>
                    <div
                        className='bg-cyan-600 h-56 flex-grow text-white bg-opacity-60  text-4xl rounded-lg space-y-2  p-6 m-5 overflow-auto'>
                        <Link to={'/saving-goals'}>Saving goals:</Link>


                        <div className='text-lg md:text-4xl  '>
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
                    className='flex flex-col bg-cyan-600 h-96 md:h-auto text-white bg-opacity-60 rounded-lg  text-4xl p-6 m-5 overflow-auto'>
                    <Link to={'/history'}>History:</Link>
                    <HistoryList history={history}></HistoryList>
                </div>
            </div>
        </div>
    )
}