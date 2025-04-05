import mongoose from "mongoose";
const MONGODB_URI = "mongodb://localhost:27017/FraudDet";

export const ConnectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("MongoDB Already Connected");
            return;
        }

        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1); 
    }
};
