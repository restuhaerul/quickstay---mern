import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return; // sudah terkoneksi
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected to:", conn.connection.name);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        throw error;
    }
};

export default connectDB;
