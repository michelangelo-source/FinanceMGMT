import {API_URL} from "../../../../config.ts";
import ky from "ky";

export interface AccountInfo {
    login: string;
    name: string;
    password?: string;
}

export const getAccounts = async () => {
    return ky.get(API_URL + 'user/own', {credentials: 'include'}).json<AccountInfo>()
}
export const putNewUserData = async (data: AccountInfo) => {
    return ky.put(API_URL + 'user/own', {
        credentials: 'include', json: data, hooks: {
            beforeError: [
                async(error) => {
                const {response} = error
                if (response) {
                    const errorBody =(await response.json()) as Error;
                    error.message = errorBody.message;
                }
                return error;
            }
            ],
        },
    }).json<AccountInfo>()
}