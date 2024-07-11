import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
});

let Prompt;
if (models.Prompt) {
    Prompt = models.Prompt;
} else {
    Prompt = model('Prompt', promptSchema);
}

export default Prompt;
