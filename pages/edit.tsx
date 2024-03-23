import Dashboard from "@/components/Dasboard";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSubjects from "@/hooks/useSubjects";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  
const edit = () => {
    const {data:currentUser,mutate} = useCurrentUser();
    const [selectedRole, setselectedRole] = useState("Faculty"); 
    const handleRadioChange = ( 
        value :any
    ) => { 
        setselectedRole(value); 
    }; 
    // const {data:subjects} = useSubjects(currentUser?.id);
    // console.log(currentUser?.subjects);
    useEffect(()=>{
        console.log(currentUser);
        setselectedRole(currentUser?.role);
    },[currentUser]);
    const onClick=()=>{
        axios.put('/api/info', {
            userId: currentUser?.id,
            newRole: selectedRole
        })
        .then(response => {
            mutate({ ...currentUser, role: selectedRole }, false);
            toast.success("Role Changed");
        })
        .catch(error => {
            console.error('Error:', error.response.data);
            toast.error("An Error Occured");
        });
      }

    return ( 
        <div className="w-screen h-screen flex">   
            <div className="w-[20%]">
            <Dashboard user={currentUser} active="Settings"/>
            </div>
            <div className="w-[80%] h-full bg-[#D9D9D9] p-32 flex flex-col items-center">
                        <div className="flex justify-center gap-x-4 my-2 py-2">
                            <div  
                            > 
                                <input 
                                    type="radio"
                                    id="Faculty"
                                    value="Faculty"
                                    checked={ 
                                        selectedRole === 
                                        "Faculty"
                                    } 
                                    onChange={() => 
                                        handleRadioChange( 
                                            "Faculty"
                                        ) 
                                    } 
                                /> 
                                <label 
                                className="ml-2"
                                    htmlFor="Faculty"
                                > 
                                    Faculty 
                                </label> 
                            </div> 
        
                            <div 
                            > 
                                <input 
                                    type="radio"
                                    id="Coordinator"
                                    value="Coordinator"
                                    checked={ 
                                        selectedRole === 
                                        "Coordinator"
                                    } 
                                    onChange={() => 
                                        handleRadioChange( 
                                            "Coordinator"
                                        ) 
                                    } 
                                /> 
                                <label 
                                className="ml-2"
                                    htmlFor="Coordinator"
                                > 
                                    Coordinator
                                </label> 
                            </div>

                            <div 
                            > 
                                <input 
                                    type="radio"
                                    id="Auditor"
                                    value="Auditor"
                                    checked={ 
                                        selectedRole === 
                                        "Auditor"
                                    } 
                                    onChange={() => 
                                        handleRadioChange( 
                                            "Auditor"
                                        ) 
                                    } 
                                /> 
                                <label 
                                className="ml-2"
                                    htmlFor="Auditor"
                                > 
                                    Auditor
                                </label> 
                            </div> 

                            <div 
                            > 
                                <input 
                                    type="radio"
                                    id="HOD"
                                    value="HOD"
                                    checked={ 
                                        selectedRole === 
                                        "HOD"
                                    } 
                                    onChange={() => 
                                        handleRadioChange( 
                                            "HOD"
                                        ) 
                                    } 
                                /> 
                                <label 
                                className="ml-2"
                                    htmlFor="OD"
                                > 
                                    HOD
                                </label> 
                            </div> 
                        </div>

                    {/* <select className="select select-bordered w-full h-12 border-[1px] mx-auto text-center  border-black rounded-md">
                        <option disabled selected>Subjects</option>
                        <option>DBMS</option>
                        <option>Maths</option>
                    </select>

                    <div className='px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg  bg-gray-400 mt-2'>
                        {subjects?.map((subject:any, i:any)=>(
                            <div key={i}>
                                {subject?.id}
                            </div>
                        ))}
                    </div> */}
                    <button
                    onClick={onClick}
                    className="bg-blue-600 px-4 py-2 font-[600] text-white mt-4 rounded-md mx-auto">Submit</button>
            </div>
            
        </div>
     );
}
 
export default edit;