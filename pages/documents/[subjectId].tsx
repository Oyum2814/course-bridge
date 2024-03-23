import Dashboard from "@/components/Dasboard";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSubject from "@/hooks/useSubject";
import clsx from "clsx";
import style from '@/public/font.module.scss';
import { useRouter } from "next/router";
import Widget from "@/components/Widget";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import FileTypes from '@/lib/filetypes';
import useDocuments from "@/hooks/useDocuments";
import { storage } from "@/appwrite/appWriteConfig";
import { IoArrowBackSharp } from "react-icons/io5";

const SubjectId = () => {
    const router = useRouter();
    const {data:currentUser} = useCurrentUser();
    const {subjectId} = router.query;
    const {data:documents} = useDocuments(subjectId as string);

    const handleBack = useCallback(() =>{
        router.back();
    },[router]);

    return (  
        <div className={clsx(style.wrapper,"w-screen h-screen flex")}>   
           
            <div className="w-[20%]">
            <Dashboard user={currentUser}/>
            </div>
            <div className="w-[80%] h-full bg-[#D9D9D9] p-32 relative">
                <button
                onClick={handleBack}
                className="absolute top-10 left-5 ">
                    <IoArrowBackSharp size={30}/>
                </button>
                <div className="grid grid-cols-3  gap-8">
                    {documents?.map((doc:any,i:number)=>(
                        <button
                        onClick={()=>{
                            const link:any = storage.getFileView('65f9726a1fc7da952227', doc);
                            window.location.href = link;
                        }}
                        key={doc?.id} className={clsx(style.wrapper,"bg-white rounded-lg w-[20vw] h-auto p-4",
                        "cursor-pointer hover:bg-gray-100 font-[700]")}>
                            <p title={FileTypes[i]} className="line-clamp-1 px-2 text-left">{FileTypes[i]}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default SubjectId;