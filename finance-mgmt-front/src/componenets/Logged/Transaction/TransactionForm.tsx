import bgIMG from "../../../assets/mainBG2.webp";
import {Navbar} from "../../Layout/Navbar.tsx";
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
        <div style={{backgroundImage: `url(${bgIMG})`}}
             className=' flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center'>
            <Navbar ActivePage='Main page'/>


            <div className='flex flex-col  h-4/5 w-4/5 lg:w-2/3 rounded-lg text-cyan-600
            bg-white bg-opacity-80'>
                <div className="flex flex-col items-center justify-center
                 rounded-xl w-11/12 h-3/4 md:w-4/5 lg:w-2/3 xl:w-1/2
            p-2 bg-cyan-600  text-white bg-opacity-90">
                    <form className={'flex flex-col justify-center it  w-3/5 md:w-1/3'}
                          onSubmit={handleSubmit(handleSubmitFun)}>
                        <div className="flex flex-row items-center space-x-2">
                            <input
                                id="incomes"
                                name="filters"
                                type="radio"
                                value="incomes"
                                onChange={() => categoryType("incomes")}
                                className="accent-cyan-500"
                            />
                            <label htmlFor="incomes" className="cursor-pointer">
                                Incomes
                            </label>


                            <input
                                id="expenditures"
                                name="filters"
                                type="radio"
                                value="expenditures"
                                onChange={() => categoryType("expenditures")}
                                className="accent-cyan-500"
                            />
                            <label htmlFor="expenditures" className="cursor-pointer">
                                Expenditures
                            </label>
                        </div>
                        <label htmlFor={"categories"}>
                            Choose a category:
                        </label>
                        <select id={"categories"}
                                className={"text-black rounded-xl p-2"} {...register('categoryId', {required: "Select category!!!"})}>
                            {selectedCategories.map((category) => (
                                <option value={category.id} key={category.id}>{category.Category}</option>))}
                        </select>
                        <p> {errors.categoryId?.message}</p>
                        <label htmlFor={"login"}>Amount:</label>
                        <input type={"number"} min={0}
                               step={0.01}  {...register('amount', {required: "Insert amount!!!"})}
                               className={'text-black rounded-xl p-2'} placeholder={"Amount"}/>
                        <p> {errors.amount?.message}</p>
                        <label htmlFor={"title"}>title:</label>
                        <input type={"title"}    {...register('title', {required: "Insert title!!!"})}
                               className={'text-black rounded-xl p-2'}
                               placeholder={"title"}/>
                        <p> {errors.description?.message}</p>
                        <label htmlFor={"description"}>description:</label>
                        <input type={"description"}    {...register('description', {required: "Insert description!!!"})}
                               className={'text-black rounded-xl p-2'}
                               placeholder={"description"}/>
                        <p> {errors.description?.message}</p>
                        <input className='rounded-xl h-10 mt-5*/}
                  bg-cyan-700 hover:bg-cyan-800' type={"submit"} value={'Add'}/>
                    </form>
                </div>
            </div>

        </div>
    )
}