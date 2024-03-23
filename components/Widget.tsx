import clsx from "clsx";
import style from '@/public/font.module.scss'
import { useEffect, useState } from "react";
import {ID} from 'appwrite';
import {storage} from "@/appwrite/appWriteConfig";
import axios from "axios";

interface WidgetProps{
    subject:any;
    user:any;
}
const Widget:React.FC<WidgetProps> = ({subject,user}) => {
    const [file, setFile] = useState<File>();
    const [loading,setLoading ] = useState(false);
    function handleChange(event:any) {
        setFile(event.target.files[0]);
    }

    const verified=subject?.verified;
    const role = user?.role;
    const stage =subject?.stage;


    const uploadFile = async (e:any)=>{
        e.preventDefault();
        let subjectId = subject?.id;
        if(file)
        {
            setLoading(true);
            const promise = storage.createFile(
                "65f9726a1fc7da952227",
                ID.unique(),
                file,
            );
            
            promise.then(
                async function (response) {
                    let fileId = response?.$id;
                    try {
                        const res = await axios.post('/api/files', {
                            subjectId,
                            fileId ,
                        });
                        // return res.data;
                        console.log(res.data);
                    } catch (error:any) {
                        throw new Error(error.response.data.message || 'Something went wrong');
                    }
                },
                function (error) {
                console.log(error); 
                }
            );
            setLoading(false);

        } 
    };

    const handleVerification = async (e:any)=>{
        e.preventDefault();
        let subjectId = subject?.id;
    
        try {
            const res = await axios.post('/api/files/verify', {
                subjectId,
            });

            console.log(res.data);
        } catch (error:any) {
            throw new Error(error.response.data.message || 'Something went wrong');
        }
        
    };

    // if(role=='Auditor' && stage==1 && subject?.documents?.length==0)
    // {
    //     return(
    //         <div>
    //             Waiting for coordinator to upload file
    //         </div>
    //     )
    // }

    if(role=='Auditor'  &&
     (stage!=subject?.documents?.length)
        ){
        return (
        <div>
            Waiting For Coordinator to submit 
        </div>
        );
    }
    else if(role=='Auditor' && verified==false && (stage==subject?.documents?.length) ){
        
        return(
        <div>
            Please Verify
            <button
            onClick={handleVerification}
            className="bg-blue-600 px-4 py-3 ">Verify</button>
        </div>
        );
    }
    else if(role=='Coordinator' && stage===subject?.documents?.length) {

        return (
            <div>
                Waiting for Verification
            </div>
        );
    }

    

    if(stage==1)
    {
        return(
        <div className={clsx(style.wrapper,"h-full dark:bg-gray-900  rounded-md flex flex-col justify-center")}>
            <label className={clsx(style.poppins," font-[600] block mb-2 text-lg text-center text-gray-900 dark:text-white tracking-[2px]" )}
            htmlFor="file_input">Upload Syllabus</label>
            <input  onChange={handleChange}
            className="mx-auto p-2 block w-[60%] text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
             aria-describedby="file_input_help" id="file_input" type="file"/>

            <button 
            disabled={loading}
            onClick={uploadFile}
            className={clsx(style.poppins,
                loading?"bg-gray-500 text-black":"bg-blue-700 hover:bg-blue-600 text-white",
            "px-4 py-2  border-gray-300 hover:border-white border-[1px] w-[20%] rounded-lg mx-auto mt-8 font-[600] text-md tracking-[1px]")}>
                {loading?"Loading":"Submit"}
            </button>
        </div> 
        )
    }
    else if(stage==2)
    {
        
        return (
            <div className={clsx(style.wrapper,"h-full dark:bg-gray-900  rounded-md flex flex-col justify-center")}>
                 <label className={clsx(style.poppins,"max-w-[60%] mx-auto font-[600] block mb-2 text-lg text-center text-gray-900 dark:text-white tracking-[2px]" )}
                htmlFor="file_input">Upload Course Objectives and Course Outcome</label>

                <input  onChange={handleChange}
                className="mx-auto p-2 block w-[60%] text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-2"
                aria-describedby="file_input_help" id="file_input" type="file"/>

                <button 
                disabled={loading}
                onClick={uploadFile}
                className={clsx(style.poppins,
                    loading?"bg-gray-500 text-black":"bg-blue-700 hover:bg-blue-600 text-white",
                "px-4 py-2  border-gray-300 hover:border-white border-[1px] w-[20%] rounded-lg mx-auto mt-8 font-[600] text-md tracking-[1px]")}>
                    {loading?"Loading":"Submit"}
                </button>
            </div>
        )
    }

    return (
         <div className="w-full bg-red-400">
            
         </div>
    );
}
 
export default Widget;