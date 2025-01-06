import bgIMG from "../../../assets/mainBG2.webp";
import {Navbar} from "../../Layout/Navbar/Navbar.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Category, getCategories} from "./transactionApi/categories.ts";
import {expenditure, income} from "./transactionApi/transaction.ts";
import {useNotification} from "../../Notification/useNotification.ts";

export interface TransactionFormData {
    title: string;
    amount: number;
    categoryId: number;
    description: string;
}

type transactionType = "incomes" | "expenditures"
export const TransactionForm = () => {
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [isIncome, setIsIncome] = useState<boolean>();
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const {setNotification} = useNotification();
    useEffect(() => {
        getCategories().then((response) => {
            setAllCategories(response);
        })
    }, [])

    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<TransactionFormData>();
    const handleSubmitFun: SubmitHandler<TransactionFormData> = async data => {
        try {
            if (isIncome) {
                income(data)
            } else {
                expenditure(data)
            }
            navigate('/mainPage')
        } catch (err) {
            const error = err as Error;
            setNotification({duration: 1000, id: Date.now(), message: error.message, type: "error"})
        }
    }
    const categoryType = (val: transactionType) => {
        if (val === "incomes") {
            setSelectedCategories(allCategories.filter((element: Category) => !element.is_expanse));
            setIsIncome(true);
        } else {
            setSelectedCategories(allCategories.filter((element: Category) => element.is_expanse));
            setIsIncome(false);
        }
    }
    return (
        <div
            style={{backgroundImage: `url(${bgIMG})`}}
            className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center"
        >
            <Navbar ActivePage="Main page"/>

            <div
                className="flex flex-col items-center justify-center h-4/5 w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/3 rounded-lg text-cyan-600 bg-white bg-opacity-60 shadow-lg">
                <div
                    className="flex flex-col items-center justify-center rounded-xl h-auto w-11/12 md:w-4/5 lg:w-2/3 xl:w-5/6 p-4 bg-cyan-600 text-white bg-opacity-60 shadow-md"
                >
                    <form
                        className="flex flex-col justify-center items-center w-full md:w-3/5 lg:w-1/2 space-y-4"
                        onSubmit={handleSubmit(handleSubmitFun)}
                    >
                        <div className="flex flex-row items-center justify-around w-full space-x-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    id="incomes"
                                    name="filters"
                                    type="radio"
                                    value="incomes"
                                    onChange={() => categoryType("incomes")}
                                    className="accent-cyan-500 cursor-pointer"
                                />
                                <label htmlFor="incomes" className="cursor-pointer">
                                    Incomes
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    id="expenditures"
                                    name="filters"
                                    type="radio"
                                    value="expenditures"
                                    onChange={() => categoryType("expenditures")}
                                    className="accent-cyan-500 cursor-pointer"
                                />
                                <label htmlFor="expenditures" className="cursor-pointer">
                                    Expenditures
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col w-full space-y-2">
                            <label htmlFor="categories" className="text-lg">
                                Choose a category:
                            </label>
                            <select
                                id="categories"
                                className="text-black rounded-xl p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                {...register("categoryId", {required: "Select category!!!"})}
                            >
                                {selectedCategories.map((category) => (
                                    <option value={category.id} key={category.id}>
                                        {category.Category}
                                    </option>
                                ))}
                            </select>
                            <p >{errors.categoryId?.message}</p>
                        </div>

                        <div className="flex flex-col w-full space-y-2">
                            <label htmlFor="amount" className="text-lg">
                                Amount:
                            </label>
                            <input
                                type="number"
                                id="amount"
                                min={0}
                                step={0.01}
                                {...register("amount", {required: "Insert amount!!!"})}
                                className="text-black rounded-xl p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Amount"
                            />
                            <p >{errors.amount?.message}</p>
                        </div>

                        <div className="flex flex-col w-full space-y-2">
                            <label htmlFor="title" className="text-lg">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="title"
                                {...register("title", {required: "Insert title!!!"})}
                                className="text-black rounded-xl p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Title"
                            />
                            <p >{errors.title?.message}</p>
                        </div>

                        <div className="flex flex-col w-full space-y-2">
                            <label htmlFor="description" className="text-lg">
                                Description:
                            </label>
                            <input
                                type="text"
                                id="description"
                                {...register("description", {required: "Insert description!!!"})}
                                className="text-black rounded-xl p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Description"
                            />
                            <p >{errors.description?.message}</p>
                        </div>

                        <input
                            className="rounded-xl h-12 w-full bg-cyan-600 hover:bg-cyan-800 text-white cursor-pointer transition-all"
                            type="submit"
                            value="Add"
                        />
                    </form>
                </div>
            </div>
        </div>

    )
}