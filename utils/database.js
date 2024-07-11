import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected!');
        return;
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompt_craft",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
        });

        isConnected = true;
        console.log('MongoDB Connected Successfully!');
    } catch (error) {
        console.log('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};
