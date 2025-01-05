import ky from "ky";
import {API_URL} from "../../../../config.ts";


export const APIlogout = async () => {

    await ky.post(`${API_URL}auth/logout`, {credentials: "include"}).text()
}