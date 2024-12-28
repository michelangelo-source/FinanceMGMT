import ky from "ky";
import {API_URL} from "../../../../config.ts";

export type Transaction ={
    id:number,
    amountBefore:number,
    amount:number,
    createdAt:Date,
    description : string;
    title : string;
}
export const getHistory =async () => {

    return ky.get(API_URL+"history/own",{ credentials: "include",}).json<Transaction[]>();
}
export const getHistoryByDates=async (dateFrom:string,dateTo:string)=>{
    return ky.get(API_URL+"history/own/"+dateFrom+"/"+dateTo,{ credentials: "include",}).json<Transaction[]>();
}