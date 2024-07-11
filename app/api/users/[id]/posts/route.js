import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({ creator: params.id }).populate("creator");

        if (!prompts) {
            return new Response(JSON.stringify({ error: 'Prompts not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error(`Failed to fetch prompts:`, error);
        return new Response(JSON.stringify({ error: 'Failed to fetch prompts' }), { status: 500 });
    }
};