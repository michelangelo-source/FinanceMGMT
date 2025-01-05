import {Navbar} from "../../Layout/Navbar.tsx";
import bgIMG from "../../../assets/mainBG2.webp";
import {useEffect, useState} from "react";
import {AccountInfo, getAccounts} from "./api/AccountData.ts";
import {SubmitHandler, useForm} from "react-hook-form";

interface PasswdChange {
    oldPassword: string;
    newPassword: string;
}


export const MyAccount = () => {
    const [userData, setUserData] = useState<AccountInfo>();
    const [editName, setEditName] = useState<boolean>(false);
    const [editLogin, setEditLogin] = useState<boolean>(false);
    const [editPassword, setEditPassword] = useState<boolean>(false);
    const {
        register: registerAccount,
        handleSubmit: handleSubmitAccount,
        formState: {errors: accountErrors},
    } = useForm<AccountInfo>();

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: {errors: passwordErrors},
    } = useForm<PasswdChange>();
    useEffect(() => {
        getAccounts().then((response) => {
            setUserData(response);
        })

    }, [])

    const deactivateEditMode = () => {
        setEditLogin(false);
        setEditName(false);

    }
    const handleDataChange: SubmitHandler<AccountInfo> = (data) => {
        if(!editName&&userData){
            data.name=userData.name;
        }if(!editLogin&&userData){
            data.login=userData.login;
        }
        console.log(data);
    }
    const handlePasswordChange: SubmitHandler<PasswdChange> = (data) => {
        console.log(data)
    }

    return (
        <div
            style={{backgroundImage: `url(${bgIMG})`}}
            className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center"
        >
            <Navbar ActivePage={"My account"} />
            <div
                className="flex flex-col w-11/12 sm:w-3/4 lg:w-2/5 rounded-2xl bg-white bg-opacity-60 p-6 text-gray-800"
            >
                {userData && (
                    <div className="flex flex-col bg-cyan-600 bg-opacity-60 rounded-lg p-6 space-y-4 text-white shadow-md">
                        <form onSubmit={handleSubmitAccount(handleDataChange)} className="space-y-4">
                            <p className="font-semibold">Name:</p>
                            {editName ? (
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 text-gray-800"
                                    type="text"
                                    defaultValue={userData.name}
                                    {...registerAccount("name", { required: true })}
                                />
                            ) : (
                                <p
                                    className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-center"
                                    onClick={() => setEditName(true)}
                                >
                                    {userData.name}
                                </p>
                            )}

                            <p className="font-semibold">Login:</p>
                            {editLogin ? (
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 text-gray-800"
                                    type="text"
                                    defaultValue={userData.login}
                                    {...registerAccount("login", { required: true })}
                                />
                            ) : (
                                <p
                                    className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-center"
                                    onClick={() => setEditLogin(true)}
                                >
                                    {userData.login}
                                </p>
                            )}

                            {(editName || editLogin) && (
                                <div className="space-y-4">
                                    <input
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 text-gray-800"
                                        type="password"
                                        placeholder="Current password"
                                        {...registerAccount("password", { required: "Insert password" })}
                                    />
                                    <p>{accountErrors.password?.message}</p>
                                    <div className="flex space-x-4">
                                        <button
                                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
                                            type="submit"
                                        >
                                            Change
                                        </button>
                                        <button
                                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
                                            type="button"
                                            onClick={() => deactivateEditMode()}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>

                        <form onSubmit={handleSubmitPassword(handlePasswordChange)} className="space-y-4">
                            <p className="font-semibold">Password:</p>
                            <p
                                className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-center"
                                onClick={() => setEditPassword(true)}
                            >
                                Change password
                            </p>
                            {editPassword && (
                                <div className="space-y-4">
                                    <input
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 text-gray-800"
                                        type="password"
                                        placeholder="Old password"
                                        {...registerPassword("oldPassword", {required: "Insert password"})}
                                    />
                                    <p>{passwordErrors.oldPassword?.message}</p>
                                    <input
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 text-gray-800"
                                        type="password"
                                        placeholder="New password"
                                        {...registerPassword("newPassword", {required: "Insert password"})}
                                    />
                                    <p>{passwordErrors.newPassword?.message}</p>
                                    <div className="flex space-x-4">
                                        <button
                                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
                                            type="submit"
                                        >
                                            Change
                                        </button>
                                        <button
                                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
                                            type="button"
                                            onClick={() => setEditPassword(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}