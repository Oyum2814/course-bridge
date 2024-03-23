import clsx from "clsx";
import style from '@/public/font.module.scss';

interface UploadWidgetProps{
    stepName:string;
    onChange:(e:any)=>void;
    disabled:boolean;
    onClick: (e:any) =>void
}
const UploadWidget:React.FC<UploadWidgetProps> = (
    {stepName,onChange,disabled,onClick}
) => {
    return ( 
        <div className={clsx(style.wrapper,"h-full dark:bg-gray-900  rounded-md flex flex-col justify-center")}>
            <label className={clsx(style.poppins," font-[600] block mb-2 text-lg text-center text-gray-900 dark:text-white tracking-[2px]" )}
            htmlFor="file_input">Upload {stepName}</label>
            <input  onChange={onChange}
            className="mx-auto p-2 block w-[60%] text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help" id="file_input" type="file"/>

            <button 
            disabled={disabled}
            onClick={onClick}
            className={clsx(style.poppins,
                disabled?"bg-gray-500 text-black font-[400]":"bg-blue-700 hover:bg-blue-600 text-white",
            "px-4 py-2  border-gray-300 hover:border-white border-[1px] w-[20%] rounded-lg mx-auto mt-8 font-[600] text-md tracking-[1px]")}>
                {disabled?"Loading":"Submit"}
            </button>
        </div> 
     );
}
 
export default UploadWidget;