import ky from "ky";
import {API_URL} from "../../../config.ts";


export const APIlogout =async () => {
    await ky.create({
        prefixUrl: API_URL,
        credentials: "include",
    }).post("auth/logout")
}