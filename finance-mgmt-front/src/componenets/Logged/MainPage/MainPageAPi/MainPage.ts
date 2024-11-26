import ky from "ky";
import {API_URL} from "../../../../config.ts";

export type balance ={
    balance: number;
}
export const Balance =async () => {

   return ky.create({
        prefixUrl: API_URL,
        credentials: "include",
    }).get<balance>("bank-account/own").json();
}