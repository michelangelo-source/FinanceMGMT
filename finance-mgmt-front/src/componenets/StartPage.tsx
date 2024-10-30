import {Link} from "react-router-dom";
import bgIMG from "../assets/backgroundStart.webp"

export const StartPage = () => {
    return (
        <div
            style={{backgroundImage: `url(${bgIMG})`}}
            className="flex flex-col lg:flex-row items-center justify-center
                        h-screen w-screen
                        bg-cover bg-center"
        >

            <div className='hidden lg:flex flex-col justify-center items-center
                            h-1/2 rounded-xl  m-5
                            bg-cyan-600 text-white  bg-opacity-90'
            >
                <div className={' p-2   text-7xl m-5 justify-center  '}>
                    Finance Mgmt
                </div>
                <div className='   p-2 m-2 rounded-xl
                            lg:h-1/2
                           text-2xl text-justify'>


                    Manage your finances effortlessly with our web app. Track income, expenses, set budgets, and analyze
                    your financial health—all in one place. Get real-time insights, smart budgeting tools, and clear
                    visualizations to stay on top of your finances and reach your goals.

                </div>
            </div>


            <div
                className='flex flex-col justify-center items-center
                           h-3/4 w-11/12 m-4 md:w-4/5 lg:w-full rounded-xl
                           bg-cyan-600 text-white bg-opacity-90'>

                <div className='lg:hidden flex flex-col items-center justify-center '>
                    <div className=' text-5xl md:text-7xl p-5'>
                        Finance Mgmt
                    </div>
                    <div className='text-xl text-justify p-5'>
                        Manage your finances effortlessly with our web app. Track income, expenses, set budgets, and
                        analyze your financial health—all in one place. Get real-time insights, smart budgeting tools,
                        and clear visualizations to stay on top of your finances and reach your goals.
                    </div>
                </div>
                <div
                    className='flex flex-col justify-center  text-2xl w-52  lg:w-72'
                >
                    Join us:
                </div>

                <Link to={'/register'} className=' flex flex-col justify-center items-center
                    m-3 w-52 h-12 lg:w-72 lg:h-24 rounded-xl
                    bg-cyan-700 hover:bg-cyan-800'>
                    Register
                </Link>
                <div
                    className='flex flex-col justify-center  text-2xl w-52  lg:w-72'
                >
                    Have account?
                </div>

                <Link to={'/login'} className=' flex flex-col justify-center items-center
                    m-3 w-52 h-12 lg:w-72 lg:h-24 rounded-xl
                    bg-cyan-700 hover:bg-cyan-800'
                >
                    Login
                </Link>
            </div>


        </div>);
}