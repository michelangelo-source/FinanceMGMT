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

    return (<ul>
            {historyProp.history.map((item, index) => (
                <li
                    key={index}
                    onMouseEnter={() => mouseIn(index)}
                    onMouseLeave={() => mouseOver()}
                    className="text-base md:text-lg flex flex-col  justify-between items-center p-2 border-b border-gray-300"
                >
                    <div className="flex flex-col md:flex-row w-full space-y-2 md:space-y-0 space-x-0 md:space-x-4">
        <span
            className={classNames(
                item.amount > 0 ? 'text-green-700' : 'text-red-800',
                'font-medium w-full md:w-1/4 text-center'
            )}
        >
          {item.amount}
        </span>
                        <span className="w-full md:w-1/4 text-center">{item.title}</span>
                        <span className="w-full md:w-1/4 text-center">
          {(Number(item.amountBefore) + Number(item.amount)) % 1 === 0
              ? Number(item.amountBefore) + Number(item.amount) + '.00'
              : (Number(item.amountBefore) + Number(item.amount)).toFixed(2)}
        </span>
                        <span className="w-full md:w-1/4 text-sm md:text-lg text-gray-500 text-center">
          {new Date(item.createdAt).toLocaleString('pl-PL', {
              day: 'numeric',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          })}
        </span>
                    </div>
                    {hover && hover[index] ? (
                        <div
                            className="flex flex-col text-sm md:text-lg text-white p-4 rounded-md w-full mt-2 md:mt-1">
                            <span>Description: {item.description}</span>
                            <span>Category: {item.category.Category}</span>
                        </div>
                    ) : null}
                </li>
            ))}
        </ul>


    )
}