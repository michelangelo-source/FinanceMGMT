import {Link, useNavigate } from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import bgIMG from "../assets/backgroundStart.webp"
interface LoginData{
    login: string,
    password: string,
}

export const Login = () => {
    const navigate = useNavigate();
    const {register, handleSubmit,formState:{errors}} = useForm<LoginData>();
    const handleSubmitFun:SubmitHandler<LoginData> =data => {

        console.log(data);
        //fetch
        setTimeout(()=>{
            navigate("/mainPage");
        },1000)
    }


    return (

        <div style={{backgroundImage: `url(${bgIMG})`}}
             className='flex flex-col items-center justify-center
                        h-screen w-screen
                        bg-cover bg-center'>
            <div className="flex flex-col items-center justify-center
                 rounded-xl w-11/12 h-3/4 md:w-4/5 lg:w-2/3 xl:w-1/2
            p-2 bg-cyan-600  text-white bg-opacity-90">

                <Link to={"/"} className='text-5xl md:text-7xl mb-10'>
                    Finance Mgmt
                </Link>

                <form className={'flex flex-col justify-center  w-3/5 md:w-1/3'}
                      onSubmit={handleSubmit(handleSubmitFun)}>
                    <label htmlFor={"login"}>Login:</label>
                    <input type={"text"}    {...register('login', {required: "Insert login!!!"})}
                           className={'text-black rounded-xl p-2'} placeholder={"Login"}/>
                    <p> {errors.login?.message}</p>
                    <label htmlFor={"password"}>Password:</label>
                    <input type={"password"}    {...register('password', {required: "Insert password!!!"})}
                           className={'text-black rounded-xl p-2'}
                           placeholder={"Password"}/>
                    <p> {errors.password?.message}</p>
                    <input className='rounded-xl h-10 mt-5
                 bg-cyan-700 hover:bg-cyan-800' type={"submit"} value={'Login'}/>
                </form>

            </div>
        </div>
            )
            }