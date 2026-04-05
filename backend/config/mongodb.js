import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB connected");
    });

    try {
        // Use correct env variable
        await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`
        );
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
