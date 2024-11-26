import ky from "ky";
import {API_URL} from "../../../../config.ts";

export type balance ={
    balance: number;
}
export const getBalance =async () => {

   return ky.get(API_URL+"bank-account/own",{ credentials: "include",}).json<balance>();
}