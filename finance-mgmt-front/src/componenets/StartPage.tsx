import {Link} from "react-router-dom";

export const StartPage = () => {
    return (
        <div className='flex flex-col lg:flex-row items-center justify-center
                        h-screen w-screen
                        bg-orange-200'>
            <div className='hidden lg:flex flex-col justify-center p-2 m-2 rounded-xl
                            lg:h-1/4 w-full
                            bg-orange-500 text-white '>
                <div className='text-4xl'>
                    Finance Mgmt
                </div>
                <div className='text-xl'>
                    Web app to manage your finance
                </div>
            </div>
            <div
                className='flex flex-col justify-center items-center
                           m-4 h-3/4 w-full md:w-4/5 lg:w-full rounded-xl
                           bg-orange-500 text-white'>
                <div className='lg:hidden flex flex-col items-center justify-center'>
                    <div className='text-4xl'>
                        Finance Mgmt
                    </div>
                    <div className='text-xl'>
                        Web app to manage your finance
                    </div>
                </div>

                <Link to={'register'} className='flex flex-col justify-center items-center
                                                 m-3 w-52 h-12 lg:w-72 lg:h-24 rounded-xl
                                                 bg-orange-600 hover:bg-orange-700'>
                    Register
                </Link>


                <Link to={'login'} className={'flex flex-col justify-center items-center ' +
                    'm-3 w-52 h-12 lg:w-72 lg:h-24 rounded-xl ' +
                    'bg-orange-600 hover:bg-orange-700'}>
                    Login
                </Link>
            </div>


        </div>);
}