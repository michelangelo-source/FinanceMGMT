import {API_URL} from "../../../../config.ts";
import ky from "ky";
export interface AccountInfo {
    login: string;
    name: string;
    password?: string;
}
export const getAccounts = async ()=>{
    return ky.get(API_URL+'user/own',{credentials:'include'}).json<AccountInfo>()
}