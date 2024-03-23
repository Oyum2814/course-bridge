import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const {subjectId} = req.query;
    if(subjectId && typeof subjectId=='string')
    {
        try{
        const subject = await prismadb.subject.findUnique({
            where: {
            id: subjectId as string,
            },
            select: {
            documents: true,
            },
        });
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        res.status(200).json( subject.documents );
        }
        catch(error){
        console.error(error);
        res.status(500).json({message:"kuch to gadhbadh hai daya"});
        }
    }
}