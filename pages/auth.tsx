import {useState, useCallback} from "react";
import axios from 'axios';
import {signIn} from 'next-auth/react';
import clsx from 'clsx';
import style from '@/public/font.module.scss';

import Image from 'next/image'
import Input from "@/components/Input";
import { FcGoogle } from "react-icons/fc";
const Auth = ()=>{

    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [selectedRole, setselectedRole] = useState(""); 
    const handleRadioChange = ( 
        value :any
    ) => { 
        setselectedRole(value); 
    }; 

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(()=>{
        setVariant((currentVariant)=>currentVariant==='login'?'register':'login');
    },[]);

    const login = useCallback(async()=>{
        try{
            const res = await signIn('credentials',{email, password, callbackUrl:'/'});
            if (res?.error) { console.log("Error  - ",res.error); }
        } catch(error){
            console.log(error);
        }
    },[email, password]);

    const register = useCallback(async ()=>{
        try{
            const res= await axios.post('/api/register',{email, username, password,selectedRole});
            login();
        } catch(error) {
            console.log("Error Appeared :: "+error);
        }
    },[email, username, password,login,selectedRole]);

    
    
    return(
        <div className={clsx(
            style.wrapper,
            "w-screen h-screen flex bg-gradient-to-r from-cyan-500 to-blue-500 md:bg-none")}>
            <div className="hidden md:block w-[50%] h-full relative">
                <Image 
                priority
                className="h-screen w-auto object-cover"
                src={"/images/asset1.png"} alt=""  fill/>
            </div>
            
            <div className="flex flex-col gap-4 justify-center items-center w-full md:w-[50%] h-full">
                <h2 className={clsx(style.montserrat,"font-[600] text-3xl text-white md:text-black")}>Course Bridge</h2>
                <div>
                    {variant==='register'&&(
                        <Input 
                        label="Name"
                        onChange={(e:any)=>setUserName(e.target.value)}
                        id="Username"
                        value={username}/>
                    )}
                    <Input 
                        label="Email"
                        onChange={(e:any)=>setEmail(e.target.value)}
                        id="email"
                        type="email"
                        value={email}
                    />
                    <Input 
                        label="Password"
                        onChange={(e:any)=>setPassword(e.target.value)}
                        id="password"
                        type="password"
                        value={password}
                    />
                    {variant=='register' && (
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
                    )}
                </div>
                <button onClick={variant==='login'?login:register} className="bg-blue-600 py-3 text-white font-medium rounded-md  mt-5
                        hover:bg-blue-800 transition w-[20%]">
                            {variant==='login'?'Login':'Sign Up'}
                </button>
                <p className="text-center text-white md:text-black">
                            {variant==='login'?'New to Course Bridge?':'Already have an account?'}
                            <span onClick={toggleVariant} className="underline ml-1 hover:text-blue-600 cursor-pointer">
                                {variant==='login'?'Create Account':'Login'}
                            </span>
                </p>
                 <div className="flex flex-col items-center gap-4 mt-8 justify-center">
                            {/* <div 
                            onClick={(e)=>{
                                e.preventDefault();
                                signIn('google',{callbackUrl:'/'});
                                }}
                                 className="md:px-12 xs:bg-blue-400 border-[1px] rounded-[40px]
                                border-[#333333] w-auto h-10 flex items-center px-3 py-6 
                                 justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30}/>
                                <div className="ml-3 text-[#333333] font-extralight">Continue with Google</div>
                            </div> */}
                        </div>
            </div>
        </div>
    );
}

export default Auth;