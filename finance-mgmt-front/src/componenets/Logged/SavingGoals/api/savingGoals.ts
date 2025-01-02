import ky from "ky";
import {API_URL} from "../../../../config.ts";
import {SavingGoal} from "../SavingGoals.tsx";

export const getSavingGoalsList = async ()=>{
    return ky.get(API_URL+"saving-goal/own",{credentials:"include"}).json<SavingGoal[]>()
}