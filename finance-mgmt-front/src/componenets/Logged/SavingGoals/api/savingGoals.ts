import ky from "ky";
import {API_URL} from "../../../../config.ts";
import {SavingGoal} from "../SavingGoals.tsx";
import {Transaction} from "../../AccountHistory/hisotryApi/HistoryApi.ts";

export const getSavingGoalsList = async ()=>{
    return ky.get(API_URL+"saving-goal/own",{credentials:"include"}).json<SavingGoal[]>()
}
export const getSavingGoalHistoryByDates = async (savingGoalid:number,dateFrom:string,dateTo:string)=>{

        return ky.get(API_URL+"saving-goal-history/own/"+savingGoalid+"/"+dateFrom+"/"+dateTo,{ credentials: "include",}).json<Transaction[]>();

}
export const deleteSavingGoal = async (id:number) => {
        return ky.delete(API_URL+'saving-goal/'+id,{credentials: "include"}).json();
}