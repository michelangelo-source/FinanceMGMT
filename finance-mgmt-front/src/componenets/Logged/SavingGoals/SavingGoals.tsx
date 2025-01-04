import {Navbar} from "../../Layout/Navbar.tsx";
import bgIMG from "../../../assets/mainBG2.webp";

export interface SavingGoal {
    goal:number,
    balance:number
    description:string
}
export const SavingGoals = () => {

    return(<div style={{backgroundImage: `url(${bgIMG})`}}
                className=' flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-center'>
        <Navbar ActivePage={'Savings goals'}/>
        <div className='flex flex-col lg:flex-row h-4/5 w-4/5 lg:w-2/3 rounded-lg text-cyan-600
            bg-white bg-opacity-80'></div>
    </div>)
}
