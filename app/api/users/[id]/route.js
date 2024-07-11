import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const user = await User.findById(params.id);

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error(`Failed to fetch user:`, error);
        return new Response(JSON.stringify({ error: 'Failed to fetch user' }), { status: 500 });
    }
};
