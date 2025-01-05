import {Transaction} from "../../Logged/AccountHistory/hisotryApi/HistoryApi.ts";
import {classNames} from "../../../globalFun/clasnameConnector.ts";
import {useEffect, useState} from "react";

interface HistoryListProps {
    history: Transaction[]
}

export const HistoryList = (historyProp: HistoryListProps) => {
    const [hover, setHover] = useState<boolean[]>();
    useEffect(() => {
        setHover(Array(history.length).fill(false));
    }, [])
    const mouseIn = (index: number) => {
        if (hover && history) {
            const newHover = Array(history.length).fill(false)
            newHover[index] = true
            setHover(newHover)
        }
    }
    const mouseOver = () => {
        if (hover && history) {
            const newHover = Array(history.length).fill(false)

            setHover(newHover)
        }
    }

    return (
        <ul>
            {historyProp.history.map((item,index) => (
                <li key={index} onMouseEnter={() => mouseIn(index)}
                    onMouseLeave={() => mouseOver()}
                    className="text-lg flex justify-between items-center p-2 border-b border-gray-300">
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
                    {(hover && hover[index]) ? (
                        <div className="text-sm text-gray-500 w-1/4">{item.description} {item.category.Category}</div>) : null}
                </li>

            ))}



        </ul>

    )
}