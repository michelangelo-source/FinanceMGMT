import Cookies  from "universal-cookie";
export const userIsLogged=()=>{
    const cookies = new Cookies();
    return cookies.get("is-logged")!==undefined;
}