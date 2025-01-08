import ky from "ky";
import {API_URL} from "../../../../config.ts";
import {RegisterData} from "../Register.tsx";

export const registerUser = async (register:RegisterData) => {
    return ky.post(API_URL + "user", {json: register,hooks: {
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
        },});
}

