import Dashboard from "@/components/Dasboard";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSubjects from "@/hooks/useSubjects";
import clsx from "clsx";
import Link from "next/link";
import style from "@/public/font.module.scss";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

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
// }

const documents = () => {
    const {data:currentUser} = useCurrentUser();
    const {data:subjects} = useSubjects();

    if(!currentUser)
      {
        return null;
      }
    return ( 
        <div className="w-screen h-screen flex">   
            <div className="w-[30%] md:w-[20%]">
                <Dashboard active="Documents" user={currentUser}/>
            </div>
            <div className="w-[70%] md:w-[80%] h-full bg-[#D9D9D9] py-16 px-4 md:p-32 flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
                    {subjects?.map((subject:any)=>(
                    <Link
                    href={`/documents/${subject?.id}`}
                    key={subject?.id} className={clsx(style.wrapper,"bg-white rounded-lg w-full md:w-[18vw] h-auto p-4",
                    "cursor-pointer hover:bg-gray-100 flex flex-col justify-between")}>
                        <div className="flex justify-between">
                            <h2 className={clsx(style.poppins,"font-[600] max-w-[90%] line-clamp-2 md:line-clamp-4")}>{subject?.title}</h2>
                        </div>
                        <div className="text-[#8B8B8B] font-[300] line-clamp-1">{subject?.stage - 1} / 22 Files Available</div>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
                  
     );
}
 
export default documents;