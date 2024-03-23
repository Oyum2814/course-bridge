import axios from 'axios';

const mainUrl="http://localhost:3000/"
const fetcher = (url:string)=>axios.get(mainUrl+url).then((res)=> res.data);

export default fetcher;