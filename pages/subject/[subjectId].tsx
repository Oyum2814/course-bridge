import Dashboard from "@/components/Dasboard";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSubject from "@/hooks/useSubject";
import clsx from "clsx";
import style from '@/public/font.module.scss';
import { useRouter } from "next/router";
import Widget from "@/components/Widget";
import { useCallback, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

// export async function getServerSideProps(context: NextPageContext){
//     const session = await getSession(context);
  
//     if(!session){
//       return {
//         redirect:{
//           destination:'/auth',
//           permanent:false,
//         }
//       }
//     }
  
//     return {
//       props:{}
//     }
//   }

const SubjectId = () => {
    const router = useRouter();
    const {data:currentUser} = useCurrentUser();
    const {subjectId} = router.query;
    const {data:currentSubject} = useSubject(subjectId);
    const handleBack = useCallback(() =>{
        router.back();
    },[router]);

    if(!currentUser)
      {
        return null;
      }
    return (  
        <div className={clsx(style.wrapper,"w-screen h-screen flex")}>   
            <div className="w-[30%] md:w-[20%]">
            <Dashboard user={currentUser}/>
            </div>
            <div className="w-[70%] md:w-[80%] h-full bg-[#D9D9D9] px-4 py-20 md:p-32 relative">
                    <button
                    onClick={handleBack}
                    className="absolute top-5 md:top-10 left-5 ">
                    <IoArrowBackSharp size={30}/>
                </button>
                <div className="h-[20%]">
                    <h2 className={clsx(style.poppins,"text-center text-lg md:text-2xl font-[600]")}>{currentSubject?.title}</h2>
                    <h3 className={clsx(style.poppins,"text-center text-sm md:text-md font-[400]")}>Stage {currentSubject?.stage}/22</h3>
                </div>
                <div className="h-[80%] flex flex-col justify-start md:justify-center">
                    <Widget subject={currentSubject} user={currentUser}/>
                </div>
            </div>
        </div>
    );
}
 
export default SubjectId;