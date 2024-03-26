import axios from 'axios';

const mainUrl=process.env.PUBLIC_URL
const fetcher = (url:string)=>axios.get(mainUrl+url).then((res)=> res.data);

export default fetcher;