import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        
        const url = new URL(req.url);
        const search = url.searchParams.get('search');

        if (!search) {
            return new Response(JSON.stringify([]), { status: 200 });
        }

        // Search conditions
        const searchConditions = {
            $or: [
                { prompt: { $regex: search, $options: 'i' } },
                { tag: { $regex: search, $options: 'i' } }
            ]
        };

        // Find users that match the search
        const users = await User.find({ username: { $regex: search, $options: 'i' } });

        if (users.length > 0) {
            searchConditions.$or.push({ creator: { $in: users.map(user => user._id) } });
        }

        const prompts = await Prompt.find(searchConditions).populate('creator');

        console.log("API search results:", prompts);  // Debugging line

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error(`Failed to fetch prompts:`, error);
        return new Response(JSON.stringify({ error: 'Failed to fetch prompts' }), { status: 500 });
    }
};
