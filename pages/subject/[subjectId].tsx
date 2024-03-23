import Dashboard from "@/components/Dasboard";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSubject from "@/hooks/useSubject";
import clsx from "clsx";
import style from '@/public/font.module.scss';
import { useRouter } from "next/router";
import Widget from "@/components/Widget";
import { useEffect } from "react";

const SubjectId = () => {
    const router = useRouter();
    const {data:currentUser} = useCurrentUser();
    const {subjectId} = router.query;
    const {data:currentSubject} = useSubject(subjectId);

    console.log(currentSubject);
    return (  
        <div className={clsx(style.wrapper,"w-screen h-screen flex")}>   
            <div className="w-[20%]">
            <Dashboard user={currentUser}/>
            </div>
            <div className="w-[80%] h-full bg-[#D9D9D9] p-32">
                <div className="h-[20%]">
                    <h2 className={clsx(style.poppins,"text-center text-2xl font-[600]")}>{currentSubject?.title}</h2>
                    <h3 className={clsx(style.poppins,"text-center text-md font-[400]")}>Stage {currentSubject?.stage}/22</h3>
                </div>
                <div className="h-[80%] flex flex-col justify-center">
                    <Widget subject={currentSubject} user={currentUser}/>
                </div>
            </div>
        </div>
    );
}
 
export default SubjectId;