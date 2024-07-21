import mongoose from "mongoose";
import { DB_URL } from "../config/index.js";


const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Database connected successfully.')
    } catch (error) {
        console.log('Failed to connect database!')
    }
}

export default connectDB
