import {Navbar} from "../../Layout/Navbar.tsx";
import bgIMG from "../../../assets/mainBG2.webp";
import {classNames} from "../../../globalFun/clasnameConnector.ts";
import {useEffect, useState} from "react";
import { getHistoryByDates, Transaction} from "./hisotryApi/HistoryApi.ts";
type Filters="all"|"incomes"|"expenditures"
export const AccountHistoryPage = () => {
    const [dateTo,setDateTo] = useState<string>(new Date(Date.now()).toISOString().split('T')[0]);
    const [dateFrom,setDateFrom] = useState<string>(new Date(Date.now()-90*1000*60*60*24).toISOString().split('T')[0]);
    const [history, setHistory] = useState<Transaction[]>();
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
                    className="flex flex-col sm:flex-row items-center justify-around bg-cyan-600 text-white bg-opacity-60 rounded-lg text-xl p-6 mt-5 mx-5 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                        <input
                            id="all"
                            name="filters"
                            type="radio"
                            value="all"
                            defaultChecked={true}
                            onChange={()=>filterHistory("all")}
                            className="accent-cyan-500"
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
                            className="accent-cyan-500"
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
                            className="accent-cyan-500"
                        />
                        <label htmlFor="expenditures" className="cursor-pointer">
                            Expenditures
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <label htmlFor="dateFrom">
                            From:
                        </label>
                        <input
                            id="dateFrom"
                            type="date"
                            min={'1950-01-01'}
                            max={dateTo}
                            defaultValue={new Date(Date.now()-90*1000*60*60*24).toISOString().split('T')[0]}
                            onChange={(e)=>setDateFrom(e.currentTarget.value)}
                            className="accent-cyan-500 text-black bg-opacity-80 rounded-md"
                        />

                    </div>
                    <div className="flex items-center space-x-2">
                        <label htmlFor="dateTo">
                            To:
                        </label>
                        <input
                            defaultValue={new Date(Date.now()).toISOString().split('T')[0]}
                            id="dateTo"
                            type="date"
                            min={dateFrom}
                            max={new Date(Date.now()).toISOString().split('T')[0]}
                            onChange={(e)=>setDateTo(e.currentTarget.value)}
                            className="accent-cyan-500 text-black bg-opacity-80 rounded-md"
                        />

                    </div>
                </div>


                <div
                    className='flex flex-col flex-grow bg-cyan-600  text-white bg-opacity-60 rounded-lg  text-4xl p-6 m-5'>
                    History:
                    <ul>
                        {history ? history.map((item) => (
                            <li key={item.id}
                                className="text-lg flex justify-between items-center p-2 border-b border-gray-300">
                                    <span
                                        className={classNames(item.amount > 0 ? 'text-green-700' : 'text-red-800', "font-medium w-1/4")}>{item.amount}</span>
                                <span className=" w-1/4">{item.title}</span>
                                <span
                                    className='w-1/4'>{(Number(item.amountBefore) + Number(item.amount)) % 1 == 0 ? Number(item.amountBefore) + Number(item.amount) + ".00" : Number(item.amountBefore) + Number(item.amount)}</span>
                                <span className="text-sm text-gray-500 w-1/4">
                                      {new Date(item.createdAt).toLocaleString('pl-PL', {
                                          day: 'numeric',
                                          month: '2-digit',
                                          year: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                      })}
                                     </span>
                            </li>

                        )) : null}
                    </ul>
                </div>
            </div>
        </div>
    )
}