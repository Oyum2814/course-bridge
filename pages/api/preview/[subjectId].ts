// pages/api/getLastDocument.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import { storage } from '@/appwrite/appWriteConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { subjectId } = req.query;
  if(!subjectId) {
    return res.status(404).json({ message: 'File Id not found' });
  }

  try {
    const subject = await prismadb.subject.findUnique({
      where: {
        id: subjectId as string,
      },
    });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const lastDocument = subject.documents.slice(-1)[0]; // Get the last element in the documents array

    const result = storage.getFileView(
      '65f9726a1fc7da952227', 
      lastDocument
    );
    
    res.status(200).json({
      preview: result,
      fileId:lastDocument
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
