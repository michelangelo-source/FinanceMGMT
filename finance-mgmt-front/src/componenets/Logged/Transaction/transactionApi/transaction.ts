import ky from "ky";
import {API_URL} from "../../../../config.ts";
import {TransactionFormData} from "../TransactionForm.tsx";

export const income = (data: TransactionFormData) => {
console.log(data.amount,
    {
    amount: data.amount,
    categoryId: data.categoryId,
    description: data.description,
    title: data.title,
})

    return ky.put(API_URL + "bank-account/deposit", {
        credentials: "include", json: {
            amount: Number(data.amount),
            categoryId: Number(data.categoryId),
            description: data.description,
            title: data.title,
        }
    })
}
export const expenditure = (data: TransactionFormData) => {
    return ky.put(API_URL + "bank-account/expenditure", {
        credentials: "include", json: {
            amount: Number(data.amount),
            categoryId: Number(data.categoryId),
            description: data.description,
            title: data.title,
        }
    })
}