import Dashboard from "@/components/Dasboard";
import useCurrentUser from "@/hooks/useCurrentUser";
import clsx from "clsx";
import Image from "next/image";
import style from "@/public/font.module.scss";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {getSession} from "next-auth/react";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import useSubjects from "@/hooks/useSubjects";
import Link from 'next/link';

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if(!session){
    return {
      redirect:{
        destination:'/auth',
        permanent:false,
      }
    }
  }

  return {
    props:{}
  }
}

export default function Home() {
  const {data:currentUser} = useCurrentUser();

  // Right now we do not give it user id so it shows all subjects
  const {data:subjects} = useSubjects();

  useEffect(()=>{
    console.log(subjects);
  },[currentUser,subjects]);
  
  return (
    <div className="w-screen h-screen flex">   
        <div className="w-[30%] md:w-[20%]">
          <Dashboard user={currentUser} active="Dashboard"/>
        </div>
        <div className="w-[70%] md:w-[80%] h-full bg-[#D9D9D9] py-8 px-4 md:py-32 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {subjects?.map((subject:any)=>(
                <Link
                href={`/subject/${subject?.id}`}
                key={subject?.id} className={clsx(style.wrapper,
                "bg-white rounded-lg w-full  md:w-[20vw] h-auto p-4",
                "cursor-pointer hover:bg-gray-100")}>
                  <div className="flex justify-between">
                    <h2 className={clsx(style.poppins,"font-[600] max-w-[90%] line-clamp-1")}>{subject?.title}</h2>
                    <div className="cursor-pointer">
                      <HiOutlineDotsHorizontal />
                    </div>
                  </div>
                  <div className="text-[#8B8B8B] font-[300]">{subject?.stage} / 22 Completed</div>
                  <div className="mt-4 w-[100%] h-3 bg-[#D9D9D9] rounded-lg">
                    <div 
                    style={{ width: `${(subject?.stage/22)*100}%` }}
                    className={`h-full bg-black rounded-lg`}/>
                  </div>
                </Link>
              ))}
          </div>
        </div>
    </div>
  );
}
