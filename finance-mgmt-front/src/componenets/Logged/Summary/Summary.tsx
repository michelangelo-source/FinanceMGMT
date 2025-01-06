import bgIMG from "../../../assets/mainBG2.webp";
import {Navbar} from "../../Layout/Navbar/Navbar.tsx";
import {useEffect, useState} from "react";
import { getHistoryByDates, Transaction} from "../AccountHistory/hisotryApi/HistoryApi.ts";
import {getBalance} from "../MainPage/MainPageAPi/MainPage.ts";
import {classNames} from "../../../globalFun/clasnameConnector.ts";

export const Summary = () => {
    const [dateTo, setDateTo] = useState<string>(new Date(Date.now()).toISOString().split('T')[0]);
    const [dateFrom, setDateFrom] = useState<string>(new Date(Date.now() - 90 * 1000 * 60 * 60 * 24).toISOString().split('T')[0]);
    const [history, setHistory] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<number>(0);
    const [timedBalance, setTimedBalance] = useState<number>(0);
    const [categoryMap, setCategoryMap] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        getHistoryByDates(dateFrom, dateTo).then((res) => {
            setHistory(res);
        })
        getBalance().then((response) => {
            setBalance(response.balance)
        });

    }, [dateFrom, dateTo]);
    useEffect(() => {
        if (history.length > 0) {
            balanceTimedAndCategories();
        }
    }, [history]);
    const balanceTimedAndCategories = () => {
        let tmpBalance = 0;
        const categories = new Map<string, number>();
        history.forEach((item) => {
            tmpBalance += parseFloat(String(item.amount))
            if (categories.has(item.category.Category)) {
                const howMany = categories.get(item.category.Category)
                if (howMany)
                    categories.set(item.category.Category, howMany + 1);
            } else {
                categories.set(item.category.Category, 1);
            }


        })

        setCategoryMap(categories)
        setTimedBalance(tmpBalance);
    }
    const sortedCategories = [...categoryMap.entries()].sort(
        ([, valueA], [, valueB]) => valueB - valueA
    );
    return (
        <div
            style={{backgroundImage: `url(${bgIMG})`}}
            className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center"
        >
            <Navbar ActivePage={"Summary"}/>

            <div
                className="flex items-center w-auto bg-white bg-opacity-80 rounded-lg p-6 shadow-lg text-cyan-600">
                <div className={'flex flex-col lg:flex-row items-center lg:items-start justify-between lg:justify-center space-y-6 lg:space-y-0 lg:space-x-8  bg-cyan-600 bg-opacity-60 rounded-lg p-6  text-white'} >
                <div className="flex flex-col w-full lg:w-1/3 space-y-4">
                    <p className="text-lg font-semibold">
                        Main balance: <span className={classNames(parseFloat(String(balance))>0?'text-green-600':'text-red-800')}>{parseFloat(String(balance)).toFixed(2)}</span>
                    </p>
                    <p className="text-lg font-semibold">
                        Balance in period of time :{" "}
                        <span className={classNames(parseFloat(String(timedBalance))>0?'text-green-600':'text-red-800')}>{parseFloat(String(timedBalance)).toFixed(2)}</span>
                    </p>
                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">Most popular categories:</h3>
                        <ul className="space-y-2 text-cyan-600">
                            {sortedCategories.map(([key, value]) => (
                                <li
                                    key={key}
                                    className="flex justify-between bg-cyan-100 rounded-md p-2"
                                >
                                    <span>{key}</span>
                                    <span>{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-start w-full lg:w-1/3 space-y-4">
                    <label htmlFor="dateFrom" className="text-lg font-medium">
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
                        className="w-full text-black h-auto bg-opacity-80 rounded-md p-2 border border-gray-300 focus:ring-2 focus:ring-cyan-500"
                    />

                    <label htmlFor="dateTo" className="text-lg font-medium">
                        To:
                    </label>
                    <input
                        id="dateTo"
                        type="date"
                        min={dateFrom}
                        max={new Date(Date.now()).toISOString().split("T")[0]}
                        defaultValue={new Date(Date.now()).toISOString().split("T")[0]}
                        onChange={(e) => setDateTo(e.currentTarget.value)}
                        className="w-full text-black h-auto bg-opacity-80 rounded-md p-2 border border-gray-300 focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                </div>
            </div>
        </div>

    )
}