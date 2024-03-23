import clsx from "clsx";
import style from '@/public/font.module.scss'
import { useEffect, useState } from "react";
import {ID} from 'appwrite';
import {storage} from "@/appwrite/appWriteConfig";
import axios from "axios";
import toast from "react-hot-toast";
import { FaFileAlt, FaFileCode } from "react-icons/fa";
import UploadWidget from "./UploadWidget";
import FileTypes from '@/lib/filetypes';
interface WidgetProps{
    subject:any;
    user:any;
}
const Widget:React.FC<WidgetProps> = ({subject,user}) => {
    const [file, setFile] = useState<File>();
    const [loading,setLoading ] = useState(false);
    const [previewLink,setPreviewLink] = useState('');
    const [previewDocId,setPreviewDocId] = useState('');

    useEffect(()=>{
        if(role=='Auditor' && verified==false && (stage==subject?.documents?.length)){
            ViewFile();
        }
    },[subject?.verified]);

    function handleFileChange(event:any) {
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
                '65f9726a1fc7da952227',
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
                        toast.success("Upload Successfull");
                        setLoading(false);
                        window.location.reload();
                    } catch (error:any) {
                        setLoading(false);
                        toast.error("An Error Occured");
                        throw new Error(error.response.data.message || 'Something went wrong');
                    }
                },
                function (error) {
                console.log(error); 
                }
            );
           
        } 
    };

    const handleVerification = async (e:any)=>{
        e.preventDefault();
        let subjectId = subject?.id;
    
        try {
            const res = await axios.post('/api/files/verify', {
                subjectId,
            });
            toast.success("Verification Completed");
            window.location.reload();
        } catch (error:any) {
            toast.error("Verfication Failed");
            throw new Error(error.response.data.message || 'Something went wrong');
        }
        
    };

    const handleFileRejection = async (e:any)=>{
        e.preventDefault();
        let subjectId = subject?.id;
    
        try {
            ViewFile();
            const res = await axios.post('/api/files/reject', {
                subjectId,
            });
            const response = await storage.deleteFile('65f9726a1fc7da952227', previewDocId);
            toast.success("File Rejected");
            window.location.reload();
            console.log(res.data);
        } catch (error:any) {
            toast.success("Error occured while rejecting file");
            throw new Error(error.response.data.message || 'Something went wrong');
        }
        
    };
    
    const ViewFile= async()=>{
        const res = await axios.get(`/api/preview/${subject?.id}`);
        setPreviewLink(res?.data?.preview);
        setPreviewDocId(res?.data?.fileId);
        
    }

    if(role=='Auditor'  &&
     (stage!=subject?.documents?.length)
        ){
        return (
            <div className={clsx(style.wrapper,"w-full h-auto p-4")}> 
                <FaFileAlt color="#6b7280" size={150} className="mx-auto"/>
                <h2 className={clsx(style.poppins,"mt-4 font-[600] text-2xl text-center text-gray-500 ")}>
                    Waiting for Coordinator to Upload File
                </h2>
            </div>
        );
    }

    // Auditor - Verify 
    else if(role=='Auditor' && verified==false && (stage==subject?.documents?.length) ){
        
        return(
        <div className="w-full h-auto p-4 flex flex-col justify-center gap-4">
            <h2 className="font-[600] text-xl text-center">Please Verify the uploaded File</h2>
            <a
            target="_blank"
            href={previewLink}
            className="px-4 my-8 md:my-0 w-[20vw] h-[20vw] flex justify-center items-center mx-auto py-8 rounded-lg bg-gray-500 text-white text-center">
                <FaFileCode size={130} color="black"/>
            </a>
            <div className="flex flex-col md:flex-row  gap-6 mx-auto">
                <button
                onClick={handleVerification}
                className="bg-blue-600 px-8 py-3 text-white font-[600] rounded-lg ">Verify
                </button>

                <button
                onClick={handleFileRejection}
                className="bg-red-600 px-8 py-3 text-white font-[600] rounded-lg ">Reject
                </button>
            </div>
        </div>
        );
    }

    //Coordinator - Wait for Verify
    else if(role=='Coordinator' && stage===subject?.documents?.length) {
        return (
            <div className={clsx(style.wrapper,"w-full h-auto p-4")}> 
                <FaFileAlt color="#6b7280" size={150} className="mx-auto"/>
                <h2 className={clsx(style.poppins,"mt-4 font-[600] text-2xl text-center text-gray-500 ")}>
                    Waiting for Auditor to Verify File
                </h2>  
            </div>
        );
    }

    

    if(stage==1)
    {
        return(
            <UploadWidget 
            stepName={FileTypes[0]} onChange={handleFileChange}
            disabled={loading}
            onClick={uploadFile}
            />
        )
    }
    if(stage<=9)
    {
        return(
            <UploadWidget 
            stepName={FileTypes[stage-1]} onChange={handleFileChange}
            disabled={loading}
            onClick={uploadFile}
            />
        )
    }
    
    return (
         <div className="w-full bg-red-400">
            
         </div>
    );
}
 
export default Widget;