import {Navbar} from "../../Layout/Navbar.tsx";
import bgIMG from "../../../assets/mainBG2.webp";
import {useEffect, useState} from "react";
import {AccountInfo, getAccounts} from "./api/AccountData.ts";
import {SubmitHandler, useForm} from "react-hook-form";

export const MyAccount = () => {
    const [userData, setUserData] = useState<AccountInfo>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editPasswordMode, setEditPasswordMode] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}} = useForm<AccountInfo>();

    useEffect(() => {
        getAccounts().then((response) => {
            setUserData(response);
        })

    }, [])
    const activeEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
    }

    const activeEditPasswordMode = () => {
        setEditPasswordMode(true);
    }
    const deactivateEditPasswordMode = () => {
        setEditPasswordMode(false);
    }


    const handleSubmitFun: SubmitHandler<AccountInfo> = async data => {
        console.log(data)
    };

    return (<div style={{backgroundImage: `url(${bgIMG})`}}
                 className=' flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center'>
            <Navbar ActivePage={'My account'}/>
            <div className='flex flex-col  h-4/5 w-4/5 lg:w-2/3 rounded-lg text-cyan-600
            bg-white bg-opacity-80 '>
                <div className="flex flex-col lg:flex-row w-full h-full  ">
                    {userData && (
                        <div
                            className={'bg-cyan-600  text-white bg-opacity-60  text-4xl rounded-lg  p-6 m-5 lg:w-full h-full lg:h-'}>

                            <div>Login: {userData.login}</div>
                            <div>Name:{userData.name}</div>
                            <button className={'hover:bg-cyan-700 rounded-xl'} onClick={activeEditMode}>edit</button>
                        </div>
                    )}

                    {editMode && (<div
                        className={'bg-cyan-600  text-white bg-opacity-60  text-lg rounded-lg  p-6 m-5 lg:w-full h-full '}>
                        <form className={'flex flex-col justify-center  w-3/5 md:w-1/3'}
                              onSubmit={handleSubmit(handleSubmitFun)}>
                            <label htmlFor={"login"}>Login:</label>
                            <input type={"text"} defaultValue={userData ? userData.login : ""}
                                   {...register('login', {required: "Insert login"})}
                                   className={'text-black rounded-xl p-2'} placeholder={"Login"}/>
                            <p> {errors.login?.message}</p>
                            <label htmlFor={"password"}>Name:</label>
                            <input type={"text"}
                                   defaultValue={userData ? userData.name : ""}   {...register('name', {required: "Insert name"})}
                                   className={'text-black rounded-xl p-2'}
                                   placeholder={""}/>
                            <p> {errors.name?.message}</p>
                            <input className='rounded-xl h-10 mt-5
                 bg-cyan-700 hover:bg-cyan-800' type={"submit"} value={'Change'}/>
                        </form>

                        <button
                            onClick={deactivateEditMode}>cancel
                        </button>
                    </div>)}
                </div>
                <div className="flex flex-col lg:flex-row w-full h-full">

                    <div
                        className={'bg-cyan-600  text-white bg-opacity-60  text-4xl rounded-lg  p-6 m-5 lg:w-full h-full'}>


                        <button onClick={activeEditPasswordMode}>edit</button>
                    </div>


                    {editPasswordMode && (<div
                        className={'bg-cyan-600  text-white bg-opacity-60  text-4xl rounded-lg  p-6 m-5 lg:w-full h-full'}>formularz <button
                        onClick={deactivateEditPasswordMode}>cancel</button></div>)}
                </div>

            </div>
        </div>
    )
}