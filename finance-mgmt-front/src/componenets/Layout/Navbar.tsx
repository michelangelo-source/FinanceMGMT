import {Link, useNavigate} from "react-router-dom";
import {APIlogout} from "./NavbarApi/logout.ts";
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
export type NavbarPages='Main page'|'Reports'|'Savings goals'|'Financial history'|'My account'
interface NavbarProps {
    ActivePage: NavbarPages
}

export const Navbar = (props: NavbarProps) => {
    const navigate = useNavigate();
    const logout = () => {
        APIlogout().then(() => {
            navigate("/")
        });

    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const navigation = [
        {name: 'Main page', href: '/mainPage', current: false},
        {name: 'Reports', href: '#', current: false},
        {name: 'Savings goals', href: '#', current: false},
        {name: 'Financial history', href: '/history', current: false},
        {name: 'My account', href: '#', current: false},

    ]
    const active = navigation.find(element => element.name == props.ActivePage)
    if (active) {
        active.current = true
    }

    return (
        <Disclosure as="nav" className="bg-cyan-600 opacity-60 fixed top-0 w-full">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden"/>
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block"/>
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">

                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-cyan-900 text-white' : 'text-cyan-300 hover:bg-cyan-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <button onClick={logout} className='text-cyan-300 hover:bg-cyan-700 hover:text-white
                                    block rounded-md px-3 py-2 text-base font-medium'> Logout
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}

                            to={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-cyan-900 text-white' : 'text-cyan-300 hover:bg-cyan-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button onClick={logout} className='text-cyan-300 hover:bg-cyan-700 hover:text-white
                                    block rounded-md px-3 py-2 text-base font-medium'> Logout
                    </button>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )

}