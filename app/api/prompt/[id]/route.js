import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) {
            console.error(`Prompt with id ${params.id} not found.`);
            return new Response(JSON.stringify({ error: 'Prompt not found' }), { status: 404 });
        }

        console.log(`Fetched prompt with id ${params.id}:`, prompt);
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error(`Failed to fetch prompt with id ${params.id}:`, error);
        return new Response(JSON.stringify({ error: 'Failed to fetch prompt' }), { status: 500 });
    }
};

export const PATCH = async (request, { params }) => {
    try {
        const { prompt, tag } = await request.json();
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            console.error(`Prompt with id ${params.id} not found.`);
            return new Response(JSON.stringify({ error: 'Prompt not found' }), { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        console.log(`Prompt with id ${params.id} updated successfully.`);
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.error(`Failed to update prompt with id ${params.id}:`, error);
        return new Response(JSON.stringify({ error: 'Failed to update prompt' }), { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        const result = await Prompt.findByIdAndDelete(params.id);

        if (!result) {
            console.error(`Prompt with id ${params.id} not found.`);
            return new Response("Prompt not found", { status: 404 });
        }

        console.log(`Prompt with id ${params.id} deleted successfully.`);
        return new Response("Prompt Deleted Successfully!", { status: 200 });
    } catch (error) {
        console.error(`Failed to delete prompt with id ${params.id}:`, error);
        return new Response("Failed to delete the prompt", { status: 500 });
    }
};
