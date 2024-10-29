import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("DB is connected sucessfully!");
    } catch (error) {
        console.log("DB is not connected! : ", error);
    }
}


export default connectDB;