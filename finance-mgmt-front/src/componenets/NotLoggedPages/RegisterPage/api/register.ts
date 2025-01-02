import ky from "ky";
import {API_URL} from "../../../../config.ts";
import {RegisterData} from "../Register.tsx";

export const registerUser = async (register:RegisterData) => {
    return ky.post(API_URL + "user", {json: register});
}