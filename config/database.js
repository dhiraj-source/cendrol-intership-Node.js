import mongoose from "mongoose";
import "colors"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`database succesfully conneccted to host ${mongoose.connection.host}`.bgYellow.black)

    } catch (error) {
        console.log(error)
    }
}

export default connectDB;