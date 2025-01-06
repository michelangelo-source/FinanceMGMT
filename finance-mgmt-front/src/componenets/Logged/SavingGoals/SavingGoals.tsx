import {Navbar} from "../../Layout/Navbar/Navbar.tsx";
import bgIMG from "../../../assets/mainBG2.webp";
import {useEffect, useState} from "react";
import {deleteSavingGoal, getSavingGoalHistoryByDates, getSavingGoalsList} from "./api/savingGoals.ts";
import {PieChart} from "@mui/x-charts/PieChart";
import {Transaction} from "../AccountHistory/hisotryApi/HistoryApi.ts";
import {HistoryList} from "../../Layout/hisotryList/historyList.tsx";
import {classNames} from "../../../globalFun/clasnameConnector.ts";
import {useNotification} from "../../Notification/useNotification.ts";
import {AddSavingGoalForm} from "./AddSavingGoalForm.tsx";
import {SavingGoalTransaction} from "./SavingGoalTransaction.tsx";

export type SavingGoalMode = "adding" | "history" | "deposit" | "withdraw"

export interface SavingGoal {
    id: number,
    goal: number,
    balance: number
    description: string
}

export const SavingGoals = () => {
    const [activeSavingGoal, setActiveSavingGoal] = useState<number>(0)
    const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([]);
    const [savingsHistory, setSavingsHistory] = useState<Transaction[]>([]);
    const [dateTo, setDateTo] = useState<string>(new Date(Date.now()).toISOString().split('T')[0]);
    const [dateFrom, setDateFrom] = useState<string>(new Date(Date.now() - 90 * 1000 * 60 * 60 * 24).toISOString().split('T')[0]);
    const {notification, setNotification} = useNotification()
    const [activeMode, setActiveMode] = useState<SavingGoalMode>('history')
    useEffect(() => {
        getSavingGoalsList().then((response) => {
            setSavingGoals(response)
        })
    }, [])
    useEffect(() => {
        getSavingGoalsList().then((response) => {
            setSavingGoals(response)
        })
    }, [activeMode, notification])
    useEffect(() => {
        if (savingGoals[0]) {
            getSavingGoalHistoryByDates(savingGoals[0].id, dateFrom, dateTo).then((res) => {
                setSavingsHistory(res);
            })
        }
    }, [dateFrom, dateTo, savingGoals]);
    const activeModeSwitch = () => {
        switch (activeMode) {
            case "history":
                return (
                    <>
                    <div className="flex flex-row items-center w-full space-x-4 justify-between">
                        {savingGoals[activeSavingGoal] && <button onClick={()=>setActiveMode('deposit')}
                            className="h-12 px-4 bg-cyan-500 hover:bg-cyan-600 w-full text-white font-semibold cursor-pointer rounded-xl ">Deposit
                             </button>}
                        {savingGoals[activeSavingGoal] && savingGoals[activeSavingGoal].balance > 0 ? <button onClick={()=>setActiveMode("withdraw")}
                            className="h-12 px-4 bg-cyan-500 hover:bg-cyan-600 w-full text-white font-semibold cursor-pointer rounded-xl ">Withdraw
                            </button> : null}
                    </div>
                    <div className="flex flex-row items-center w-full space-x-4 text-white text-lg ">
                        <label htmlFor="dateFrom" className="font-medium">
                            From:
                        </label>
                        <input
                            id="dateFrom"
                            type="date"
                            min={"1950-01-01"}
                            max={dateTo}
                            defaultValue={new Date(Date.now() - 90 * 1000 * 60 * 60 * 24)
                                .toISOString()
                                .split("T")[0]}
                            onChange={(e) => setDateFrom(e.currentTarget.value)}
                            className="w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none text-gray-700 bg-white"
                        />

                        <label htmlFor="dateTo" className="font-medium">
                            To:
                        </label>
                        <input
                            id="dateTo"
                            type="date"
                            min={dateFrom}
                            max={new Date(Date.now()).toISOString().split("T")[0]}
                            defaultValue={new Date(Date.now()).toISOString().split("T")[0]}
                            onChange={(e) => setDateTo(e.currentTarget.value)}
                            className="w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none text-gray-700 bg-white"
                        />
                    </div>
                    <div className="w-full mt-4 text-white ">
                        <HistoryList history={savingsHistory}></HistoryList>
                    </div>
                </>)
            case "adding":
                return <AddSavingGoalForm cancel={cancelActiveMode}/>
            case "deposit":
                return <SavingGoalTransaction SavingGoalId={savingGoals[activeSavingGoal].id} activeMode={activeMode} cancel={cancelActiveMode} balance={savingGoals[activeSavingGoal].balance} goal={savingGoals[activeSavingGoal].goal}/>
            case "withdraw":
                return <SavingGoalTransaction SavingGoalId={savingGoals[activeSavingGoal].id} activeMode={activeMode} cancel={cancelActiveMode} balance={savingGoals[activeSavingGoal].balance} goal={savingGoals[activeSavingGoal].goal} />
        }
    }
    const cancelActiveMode = () => {
        setActiveMode("history");
    }
    const handleChooseSavingGoal = (id: number) => {
        getSavingGoalHistoryByDates(savingGoals[id].id, dateFrom, dateTo).then((res) => {
            setSavingsHistory(res);
            setActiveSavingGoal(id)
        })
    }

    const handelDeleteSavingGoal = () => {
        try {
            deleteSavingGoal(savingGoals[activeSavingGoal].id).then()
            setNotification({
                duration: 2000,
                message: "Saving Goal deleted",
                id: Date.now(),
                type: "success",
            })
            setActiveSavingGoal(0)
            setSavingsHistory([])
        } catch (err) {
            const error = err as Error
            console.log(error)
            setNotification({
                duration: 2000,
                message: "Something went wrong",
                id: Date.now(),
                type: "error",
            })
        }


    }
    return (<div
            style={{backgroundImage: `url(${bgIMG})`}}
            className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center"
        >
            <Navbar ActivePage={"Savings goals"}/>
        <div
            className="flex flex-col lg:flex-row h-4/5 w-11/12 lg:w-2/3 rounded-2xl text-cyan-600
      bg-white bg-opacity-90 shadow-lg overflow-hidden"
        >
            <div
                className="flex flex-col lg:w-1/3  h-1/3 md:h-auto p-4 space-y-4 overflow-y-auto bg-cyan-600 bg-opacity-60 m-5 rounded-xl overflow-auto">
                <div className="flex flex-row space-x-4 w-full">
                    <button onClick={() => setActiveMode("adding")}
                            className="h-12 px-4 bg-cyan-500 hover:bg-cyan-600 w-1/2  text-white font-semibold cursor-pointer rounded-xl ">
                        Add
                    </button>
                    <button onClick={handelDeleteSavingGoal}
                            className="h-12 px-4 bg-cyan-500 hover:bg-cyan-600 w-1/2 text-white font-semibold cursor-pointer rounded-xl ">
                        Delete
                    </button>
                </div>


                {savingGoals &&
                    savingGoals.map((el, index) => (
                        <div
                            key={index}
                            className={classNames(activeSavingGoal == index ? 'bg-cyan-600' : " ", "flex flex-row items-center justify-between p-3 hover:bg-cyan-700 text-white cursor-pointer rounded-lg transition duration-200 ease-in-out border-b ")}
                            onClick={() => handleChooseSavingGoal(index)}
                        >
                            <p className="text-lg font-medium">{el.description}</p>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            {
                                                id: index,
                                                value: (el.balance / el.goal) * 100,
                                                color: "green",
                                                label: el.description,
                                            },
                                        ],
                                        innerRadius: 10,
                                        outerRadius: 14,
                                        startAngle: 0,
                                        endAngle: 360 * (el.balance / el.goal),
                                    },
                                ]}
                                slotProps={{legend: {hidden: true}}}
                                width={50}
                                height={50}
                            />
                            <p className="text-lg font-semibold">
                                {(el.balance / el.goal * 100).toFixed(2)}%
                            </p>
                        </div>
                    ))}
            </div>

            <div
                className="flex flex-col text-2xl text-white  h-2/3 md:h-auto lg:w-2/3 items-center p-6 space-y-6 bg-cyan-600 bg-opacity-60 m-5 rounded-lg overflow-auto">
                {savingGoals[activeSavingGoal]&& activeMode!='adding' ?<div className={'flex flex-col justify-center items-center'}>{savingGoals[activeSavingGoal].description}<div className={'flex flex-row space-x-4'  }><p>Goal: {savingGoals[activeSavingGoal].goal}</p>
                    <p>balance :{savingGoals[activeSavingGoal].balance}</p></div> </div>: null}
                {activeModeSwitch()}
            </div>
            </div>
        </div>

        )
        }
