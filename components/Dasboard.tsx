import Image from 'next/image';
import clsx from 'clsx';
import style from '@/public/font.module.scss';
import { CiLogout } from "react-icons/ci";
import { IoDocumentText } from "react-icons/io5";
import {signOut} from 'next-auth/react';
import Link from 'next/link'
interface DashboardProps{
    user?:any;
    active?:string;
}
const Dashboard:React.FC<DashboardProps> = ({user,active}) => {
    
    return ( 
        <div className={clsx("flex flex-col  w-full h-screen px-4 py-8 overflow-y-auto bg-[#D9D9D9] dark:bg-gray-900 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700")}>
            <a href="#" className="mx-auto text-sm md:text-2xl dark:text-white font-[600] text-center">
                Course Bridge
            </a>

            <div className="flex flex-col items-center mt-6 -mx-2">
                <Image width={50} height={30} className="object-cover h-[60px] w-[60px] md:w-[90px] md:h-[90px] flex-shrink-0 mx-2 rounded-full"
                 src={user?.image||'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="avatar" />
                <h4 className="mx-2 mt-2 font-xs md:font-medium text-gray-800 dark:text-gray-200">{user?.name}</h4>
                <p className="mx-2 mt-1 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">{user?.role}</p>
            </div>

            <div className="flex flex-col justify-between  flex-1 mt-6">
                <nav>
                    <Link className={clsx(active=="Dashboard"?"bg-gray-800":"",
                    "flex items-center px-4 py-2 text-gray-700 rounded-lg  dark:text-gray-200 my-2")} href="/">
                        <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span className="mx-4 font-medium hidden md:flex">Dashboard</span>
                    </Link>

                    <Link className={clsx(active=="Documents"?"bg-gray-800":"",
                    "flex items-center px-4 py-2 text-gray-700 rounded-lg  dark:text-gray-200 my-2")} href="/documents">
                        <IoDocumentText size={20} className="w-[18px] h-[18px] flex-shrink-0"/>

                        <span className="mx-4 font-medium hidden md:flex">Documents</span>
                    </Link>

                    <Link className={clsx(active=="Settings"?"bg-gray-800":"",
                    "flex items-center px-4 py-2 text-gray-700 rounded-lg  dark:text-gray-200 my-2")}
                     href="/edit">
                        <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span className="mx-4 font-medium hidden md:flex">Settings</span>
                    </Link>
                    {user && 
                    (
                        <button 
                        onClick={()=>signOut()}

                        className="mt-5 w-full text-center  text-white bg-red-800 px-4 py-2 rounded-lg hover:bg-red-700">
                            <div className="">
                                <CiLogout size={20} className="mx-auto"/>
                            </div>
                        </button>
                    )}
                </nav>
            </div>
        </div>
     );
}
 
export default Dashboard;