import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { userId, newRole } = req.body;

        // Find the user by userId
        const user = await prismadb.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user's role with the latest value
        const updatedUser = await prismadb.user.update({
            where: { id: userId },
            data: { role: newRole }
        });

        return res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}