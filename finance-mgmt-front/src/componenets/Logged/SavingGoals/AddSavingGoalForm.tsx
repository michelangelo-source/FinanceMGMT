import {SubmitHandler, useForm} from "react-hook-form";
import {useNotification} from "../../Notification/useNotification.ts";
import {addSavingGoal} from "./api/savingGoals.ts";

interface AddSavingGoalProps{
    cancel:()=>void;
}
export interface SavingGoalDTO{
    goal:number;
    description:string;
}

export const AddSavingGoalForm=(prop:AddSavingGoalProps)=>{
    const {register, handleSubmit, formState: {errors}} = useForm<SavingGoalDTO>();
    const{setNotification} = useNotification();
    const handleSubmitFun: SubmitHandler<SavingGoalDTO> = async data => {
        try {
            await addSavingGoal(data)
            setNotification ({
                id:Date.now(),
                message: "Added!",
                type: "success",
                duration: 1000,
            })
            prop.cancel();
        } catch {
            setNotification ({
                id:Date.now(),
                message: "Saving goal cannot be added right now",
                type: "error",
                duration: 3000,
            })
        }
    }
    return(
        <form className={'flex flex-col justify-center space-y-2  w-3/5 md:w-1/3'}
              onSubmit={handleSubmit(handleSubmitFun)}>
            <label htmlFor={"goal"}>Goal:</label>
            <input type={"number"} min={0}    {...register('goal', {required: "Insert Goal"})}
                   className={'text-black rounded-xl p-2'} placeholder={"1000"}/>
            <p> {errors.goal?.message}</p>
            <label htmlFor={"description"}>Description:</label>
            <input type={"text"}    {...register('description', {required: "Insert description"})}
                   className={'text-black rounded-xl p-2'}
                   placeholder={"Description"}/>
            <p> {errors.description?.message}</p>
            <input className='rounded-xl h-10 mt-5
                 bg-cyan-600 hover:bg-cyan-800' type={"submit"} value={'Add'}/>
            <button onClick={prop.cancel}>cancel</button>
        </form>
    )
}