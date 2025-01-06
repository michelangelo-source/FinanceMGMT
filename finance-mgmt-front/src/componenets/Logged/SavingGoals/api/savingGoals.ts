import ky from "ky";
import {API_URL} from "../../../../config.ts";
import {SavingGoal, SavingGoalMode} from "../SavingGoals.tsx";
import {Transaction} from "../../AccountHistory/hisotryApi/HistoryApi.ts";
import {SavingGoalDTO} from "../AddSavingGoalForm.tsx";
import {SavingGoalTransactionDTO} from "../SavingGoalTransaction.tsx";

export const getSavingGoalsList = async () => {
    return ky.get(API_URL + "saving-goal/own", {credentials: "include"}).json<SavingGoal[]>()
}
export const getSavingGoalHistoryByDates = async (savingGoalid: number, dateFrom: string, dateTo: string) => {

    return ky.get(API_URL + "saving-goal-history/own/" + savingGoalid + "/" + dateFrom + "/" + dateTo, {credentials: "include",}).json<Transaction[]>();

}
export const addSavingGoal = async (data: SavingGoalDTO) => {
    data.goal = parseFloat(String(data.goal))
    return ky.post(API_URL + "saving-goal", {credentials: "include", json: data}).json<SavingGoal>()
}
export const deleteSavingGoal = async (id: number) => {
    return ky.delete(API_URL + 'saving-goal/' + id, {credentials: "include"}).json();
}
export const savingGoalTransaction=async (data:SavingGoalTransactionDTO,activeMode:SavingGoalMode)=>{
    let endpoint: string
    if (activeMode == "deposit") {
        endpoint="deposit"
    } else {
        endpoint="expenditure"
    }
    data.amount = parseFloat(String(data.amount))
    await ky.put(API_URL + "saving-goal/" + endpoint, {credentials: "include", json: data}).json()
}