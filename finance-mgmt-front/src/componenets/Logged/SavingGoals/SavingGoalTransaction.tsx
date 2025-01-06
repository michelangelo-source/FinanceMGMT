import {SavingGoalMode} from "./SavingGoals.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNotification} from "../../Notification/useNotification.ts";
import {savingGoalTransaction} from "./api/savingGoals.ts";

interface SavingGoalTransactionProp {
    SavingGoalId: number;
    activeMode: SavingGoalMode
    cancel: () => void
    goal:number
    balance:number
}

export interface SavingGoalTransactionDTO {
    amount: number;
    "categoryId": number,
    description: string
    title: string
    SavingAccountId: number
}

export const SavingGoalTransaction = (props: SavingGoalTransactionProp) => {
    const {register, handleSubmit, formState: {errors}} = useForm<SavingGoalTransactionDTO>();
    const {setNotification} = useNotification();
    const handleSubmitFun: SubmitHandler<SavingGoalTransactionDTO> = async data => {
        try {
            if (props.activeMode == "deposit") {
                data.categoryId = 11
            } else {
                data.categoryId = 12
            }
            data.SavingAccountId=props.SavingGoalId
            await savingGoalTransaction(data, props.activeMode)
            setNotification({
                id: Date.now(),
                message: "Money transferred",
                type: "success",
                duration: 1000,
            })
            props.cancel()
        } catch {
            setNotification({
                id: Date.now(),
                message: "Money cannot be transferred right now",
                type: "error",
                duration: 3000,
            })
        }
    }

    return (
        <>{props.activeMode == 'deposit' ? <p> Deposit money</p> : <p>Withdraw money</p>}
            <form className={'flex flex-col justify-center space-y-2  w-3/5 md:w-1/3'}
                  onSubmit={handleSubmit(handleSubmitFun)}>
                <label htmlFor={"amount"}>Amount:</label>
                <input type={"number"} min={0} max={props.activeMode=='deposit'?props.goal-props.balance:props.balance}   {...register('amount', {required: "Insert amount"})}
                       className={'text-black rounded-xl p-2'} placeholder={"1000"}/>
                <p> {errors.amount?.message}</p>
                <label htmlFor={"title"}>Title:</label>
                <input type={"text"}    {...register('title', {required: "Insert title"})}
                       className={'text-black rounded-xl p-2'}
                       placeholder={"Title"}/>
                <p> {errors.title?.message}</p>
                <label htmlFor={"description"}>Description:</label>
                <input type={"text"}    {...register('description', {required: "Insert description"})}
                       className={'text-black rounded-xl p-2'}
                       placeholder={"Description"}/>
                <p> {errors.description?.message}</p>
                <input className='rounded-xl h-10 mt-5
                 bg-cyan-600 hover:bg-cyan-800' type={"submit"} value={'Add'}/>
                <button onClick={props.cancel}>cancel</button>
            </form>
        </>
    )

}
