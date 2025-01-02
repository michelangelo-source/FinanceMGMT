import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import bgIMG from "../../../assets/backgroundStart.webp"
import {registerUser} from "./api/register.ts";
import {useNotification} from "../../Notification/useNotification.ts";

export interface RegisterData {
    login: string;
    password: string;
    name: string;

}

export const Register = () => {
    const navigate = useNavigate();
    const {setNotification} = useNotification();
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterData>();
    const handleSubmitFun: SubmitHandler<RegisterData> = data => {

        try {
            registerUser(data).then(() => {
                    navigate("/login");
                    setNotification({
                        id: Date.now(),
                        message: "registered successfully",
                        type: "success",
                        duration: 3000,
                    })
                }
            )
        } catch (err) {
            const error = err as Error
            setNotification({
                id: Date.now(),
                message: error.message,
                type: "error",
                duration: 4000,
            })
        }
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
                <form className=' flex flex-col justify-center  w-3/5 md:w-1/3'
                      onSubmit={handleSubmit(handleSubmitFun)}>
                    <label htmlFor={"username"}>Login:</label>
                    <input type={"text"}
                           {...register('login',
                               {
                                   required: "Insert login!!!",
                                   minLength:
                                       {
                                           value: 8, message: "Min length 8"
                                       },
                                   pattern:
                                       {
                                           value: /^\S*$/i,
                                           message: "Without space"
                                       }
                               })}
                           className={'text-black rounded-xl p-2'} placeholder={"Login"}/>
                    <p>{errors.login?.message}</p>
                    <label htmlFor={"password"}>Password:</label>
                    <input type={"password"} {...register('password', {
                        required: "Insert password!!!",
                        minLength:
                            {
                                value: 8, message: "Min length 8"
                            },
                        pattern:
                            {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/i,
                                message: "One big, one small, ona digit, one special charter"
                            }
                    })} className={'text-black rounded-xl p-2'}
                           placeholder={"Password"}/>
                    <p>{errors.password?.message}</p>
                    <label htmlFor={"name"}>Name:</label>
                    <input type={"name"} {...register('name', {
                        required: "Insert your name!!!",
                        pattern:
                            {
                                value: /^\S*$/i,
                                message: "Without space"
                            },
                    })} className={'text-black rounded-xl p-2'}
                           placeholder={"Name"}/>
                    <p>{errors.name?.message}</p>
                    <input className='rounded-xl h-10 mt-5
                 bg-cyan-700 hover:bg-cyan-800' type={"submit"} value={'Register'}/>
                </form>
            </div>
        </div>
    )
}