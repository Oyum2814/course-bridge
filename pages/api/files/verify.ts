

import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { subjectId } = req.body;

  try {
    const subject = await prismadb.subject.findUnique({
      where: {
        id: subjectId,
      },
    });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const updatedSubject = await prismadb.subject.update({
      where: {
        id: subjectId,
      },
      data: {
        stage: {
            increment: 1,
          },
        verified:true,
      },
    });

    res.status(200).json(updatedSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}