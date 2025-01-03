import ky from "ky";
import {API_URL} from "../../../../config.ts";
export type Category={
   id:number,
   Category:string,
   is_expanse:boolean,
}
export type Transaction ={
    id:number,
    amountBefore:number,
    amount:number,
    createdAt:Date,
    description : string;
    title : string;
    category:Category
}
export const getHistory =async () => {

    return ky.get(API_URL+"history/own",{ credentials: "include",}).json<Transaction[]>();
}
export const getHistoryByDates=async (dateFrom:string,dateTo:string)=>{
    return ky.get(API_URL+"history/own/"+dateFrom+"/"+dateTo,{ credentials: "include",}).json<Transaction[]>();
}