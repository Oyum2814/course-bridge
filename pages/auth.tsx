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
    const [subjects,setSubjects] = useState([]);
    
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
            const res= await axios.post('/api/register',{email, username, password});
            login();
        } catch(error) {
            console.log("Error Appeared :: "+error);
        }
    },[email, username, password,login]);

    
    
    return(
        <div className={clsx(
            style.wrapper,
            "w-screen h-screen flex")}>
            <div className="hidden md:block w-[50%] h-full relative">
                <Image 
                priority
                className="h-screen w-auto"
                src={"/images/asset1.png"} alt=""  fill/>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center w-full md:w-[50%] h-full">
                <h2 className={clsx(style.montserrat,"font-[600] text-3xl")}>Course Bridge</h2>
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
                    
                
                </div>
                <button onClick={variant==='login'?login:register} className="bg-blue-600 py-3 text-white font-medium rounded-md  mt-5
                        hover:bg-blue-800 transition w-[20%]">
                            {variant==='login'?'Login':'Sign Up'}
                </button>
                <p className="text-center">
                            {variant==='login'?'New to Course Bridge?':'Already have an account?'}
                            <span onClick={toggleVariant} className="underline ml-1 hover:text-blue-600 cursor-pointer">
                                {variant==='login'?'Create Account':'Login'}
                            </span>
                </p>
                 <div className="flex flex-col items-center gap-4 mt-8 justify-center">
                            <div 
                            onClick={(e)=>{
                                e.preventDefault();
                                signIn('google',{callbackUrl:'/'});
                                }}
                                 className="md:px-12 xs:bg-blue-400 border-[1px] rounded-[40px]
                                border-[#333333] w-auto h-10 flex items-center px-3 py-6 
                                 justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30}/>
                                <div className="ml-3 text-[#333333] font-extralight">Continue with Google</div>
                            </div>
                        </div>
            </div>
        </div>
    );
}

export default Auth;