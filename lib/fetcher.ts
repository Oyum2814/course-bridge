import axios from 'axios';

const mainUrl= "https://course-bridge.vercel.app/";
const fetcher = (url:string)=>axios.get(mainUrl+url).then((res)=> res.data);

export default fetcher;