
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    try {

            const {subjectId} = req.query;
            let subject;

            if(subjectId && typeof subjectId ==='string')
            {
                subject = await prismadb.subject.findUnique({
                    where:{
                        id:subjectId
                    },
                });
            }
            else{
                console.log("Invalid ID");
            }
         
            res.status(200).json(subject);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
