import ky from "ky";
import {API_URL} from "../../../../config.ts";

export const login = async (login: string, password: string) => {
    await ky.create({
        prefixUrl: API_URL,
        headers: {Authorization: "Basic "+window.btoa(login + ":" + password)},
        credentials: "include",
    }).post("auth/login")
}