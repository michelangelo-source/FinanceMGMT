import ky from "ky";
import {API_URL} from "../../../../config.ts";
import {TransactionFormData} from "../TransactionForm.tsx";

export const income = (data: TransactionFormData) => {
    data.amount=parseFloat(String(data.amount))
    data.categoryId=parseFloat(String(data.categoryId))
    return ky.put(API_URL + "bank-account/deposit", {
        credentials: "include", json: data,hooks: {
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
        }
    })
}
export const expenditure = (data: TransactionFormData) => {
    data.amount=parseFloat(String(data.amount))
    data.categoryId=parseFloat(String(data.categoryId))
    return ky.put(API_URL + "bank-account/expenditure", {
        credentials: "include", json: data,hooks: {
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
        }
    })
}