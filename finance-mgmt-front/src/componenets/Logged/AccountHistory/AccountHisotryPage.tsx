import {Navbar} from "../../Layout/Navbar/Navbar.tsx";
import bgIMG from "../../../assets/mainBG2.webp";
import {useEffect, useState} from "react";
import {getHistoryByDates, Transaction} from "./hisotryApi/HistoryApi.ts";
import {HistoryList} from "../../Layout/hisotryList/historyList.tsx";

type Filters="all"|"incomes"|"expenditures"
export const AccountHistoryPage = () => {
    const [dateTo,setDateTo] = useState<string>(new Date(Date.now()).toISOString().split('T')[0]);
    const [dateFrom,setDateFrom] = useState<string>(new Date(Date.now()-90*1000*60*60*24).toISOString().split('T')[0]);
    const [history, setHistory] = useState<Transaction[]>([]);
    const [allHistory, setAllHistory] = useState<Transaction[]>();
    const [filter, setFilter] = useState<Filters>("all");
    useEffect(() => {
        getHistoryByDates(dateFrom,dateTo).then((response) => {
            setHistory(response)
            setAllHistory(response);
        })

    }, [dateTo,dateFrom]);
    useEffect(() => {
        filterHistory(filter);
    }, [filter, allHistory]);
    const filterHistory=(value:Filters)=>{
        if(allHistory)
        switch (value){
            case ("all"):{
                setHistory(allHistory);
                break;
            }
            case ("incomes"):{
                setHistory(allHistory.filter((element:Transaction) => element.amount>0));
                break;
            }
            case ("expenditures"):{
                setHistory(allHistory.filter((element:Transaction) => element.amount<0));
                break;
            }
        }
        setFilter(value)
    }

    return (
        <div style={{backgroundImage: `url(${bgIMG})`}}
             className=' flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center'>
            <Navbar ActivePage='Financial history'/>
            <div className='flex flex-col  h-4/5 w-4/5 lg:w-2/3 rounded-lg text-cyan-600
            bg-white bg-opacity-80'>

                <div
                    className="flex flex-col sm:flex-row items-center justify-between bg-cyan-600 text-white bg-opacity-60 rounded-lg text-lg p-6 mt-5 mx-5 space-y-6 sm:space-y-0 sm:space-x-6"
                >
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="flex items-center space-x-2">
                            <input
                                id="all"
                                name="filters"
                                type="radio"
                                value="all"
                                defaultChecked={true}
                                onChange={() => filterHistory("all")}
                                className="accent-cyan-500 cursor-pointer"
                            />
                            <label htmlFor="all" className="cursor-pointer">
                                All
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                id="incomes"
                                name="filters"
                                type="radio"
                                value="incomes"
                                onChange={() => filterHistory("incomes")}
                                className="accent-cyan-500 cursor-pointer"
                            />
                            <label htmlFor="incomes" className="cursor-pointer">
                                Incomes
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                id="expenditures"
                                name="filters"
                                type="radio"
                                value="expenditures"
                                onChange={() => filterHistory("expenditures")}
                                className="accent-cyan-500 cursor-pointer"
                            />
                            <label htmlFor="expenditures" className="cursor-pointer">
                                Expenditures
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <label htmlFor="dateFrom" className="whitespace-nowrap">
                            From:
                        </label>
                        <input
                            id="dateFrom"
                            type="date"
                            min="1950-01-01"
                            max={dateTo}
                            defaultValue={new Date(Date.now() - 90 * 1000 * 60 * 60 * 24)
                                .toISOString()
                                .split("T")[0]}
                            onChange={(e) => setDateFrom(e.currentTarget.value)}
                            className="w-full sm:w-auto text-black bg-opacity-80 rounded-md p-2 border border-gray-300"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label htmlFor="dateTo" className="whitespace-nowrap">
                            To:
                        </label>
                        <input
                            id="dateTo"
                            type="date"
                            min={dateFrom}
                            max={new Date(Date.now()).toISOString().split("T")[0]}
                            defaultValue={new Date(Date.now()).toISOString().split("T")[0]}
                            onChange={(e) => setDateTo(e.currentTarget.value)}
                            className="w-full sm:w-auto text-black bg-opacity-80 rounded-md p-2 border border-gray-300"
                        />
                    </div>
                </div>


                <div
                    className='flex flex-col flex-grow bg-cyan-600  text-white bg-opacity-60 rounded-lg  text-4xl p-6 m-5 overflow-auto'>
                    History:
                    <HistoryList history={history}></HistoryList>
                </div>
            </div>
        </div>
    )
}