import ky from "ky";
import {API_URL} from "../../../../config.ts";

export type Category={
    "id": number,
    "Category": string,
    "is_expanse": boolean,
}
export const getCategories =async () => {
    return ky.get(API_URL+"categories",{ credentials: "include",}).json<Category[]>();
}
