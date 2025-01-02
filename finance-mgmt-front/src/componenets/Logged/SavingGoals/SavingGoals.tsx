import {Navbar} from "../../Layout/Navbar.tsx";

export interface SavingGoal {
    goal:number,
    balance:number
    description:string
}
export const SavingGoals = () => {

    return(<>
        <Navbar ActivePage='Savings goals'/>
    <h1>SavinGoals</h1>
    </>)
}
