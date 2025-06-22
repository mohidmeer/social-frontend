import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { History, LayoutDashboard, LogOut,  Settings, Users, Workflow } from "lucide-react"

import { Link, } from "react-router-dom";

import { getUserEmail, getUsername,} from "../lib/utils";

import Logo from '../components/Logo';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover"
import md5 from "md5";


const DashboardLayout: React.FC = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("social-api-auth-token");
        navigate("/auth/login");
    };
    return (
        <main>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0  bg-gray-50 border-r ">
                <div className="h-full px-2 py-4   overflow-y-hidden">
                    <div className="flex items-center ps-1 mb-5 text-gray-800 ">
                        <Logo size={30} textOrientation="flex" />
                    </div>
                    <ul className="space-y-1 h-full flex flex-col font-medium text-sm">
                        <li>
                            <Link to='/dashboard' className="flex items-center p-2 text-gray-900 rounded-lg group hover:bg-black/5 ">
                                <LayoutDashboard className='w-5 h-5  transition duration-75  text-gray-900' />
                                <span className="ms-2">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/schedules' className="flex items-center p-2 text-gray-900 rounded-lg group hover:bg-black/5 ">
                                <Workflow className='w-5 h-5  transition duration-75  text-gray-900' />
                                <span className="ms-2">Schedules</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/accounts' className="flex items-center p-2 text-gray-900 rounded-lg group hover:bg-black/5 ">
                                <Users className='w-5 h-5  transition duration-75  text-gray-900' />
                                <span className="ms-1">Account Manager </span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/history' className="flex items-center p-2 text-gray-900 rounded-lg group hover:bg-black/5 ">
                                <History className='w-5 h-5  transition duration-75  text-gray-900' />
                                <span className="ms-1">Post History</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/settings' className="flex items-center p-2 text-gray-900 rounded-lg group hover:bg-black/5 ">
                                <Settings className='w-5 h-5  transition duration-75  text-gray-900' />
                                <span className="ms-1">Settings</span>
                            </Link>
                        </li>

                        <li className="mt-auto mb-20">
                            <Popover>
                                <PopoverTrigger className='flex items-center text-left'>
                                    <div className="flex gap-2 cursor-pointer items-center">
                                        <div className="shrink-0 overflow-hidden rounded-full">
                                            <img src={`https://www.gravatar.com/avatar/${md5(getUserEmail())}`} className=" h-10 w-10 shrink-0 " />
                                        </div>
                                        <div className="text-xs text-gray-800 font-bold flex flex-col !items-start">
                                            <p>{getUsername()}</p>
                                            <p>{getUserEmail()}</p>

                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className='p-1 w-64'>
                                    <div className="flex flex-col gap-2 items-center">

                                        <button className="w-full flex items-center text-sm text-destructive hover:bg-black/5   p-2 rounded-lg group cursor-pointer" onClick={() => { handleLogout() }}>
                                            <LogOut className="w-4 h-4" />
                                            <span className="ms-3 whitespace-nowrap">Sign Out</span>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>



                        </li>
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:ml-64">
                <div className="p-10 border-2 border-gray-200 border-dashed rounded-lg">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}



export default DashboardLayout;