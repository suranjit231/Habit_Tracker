import mongoose from "mongoose";
const url = "mongodb://localhost:27017/HabitTracker";

const connectMongodb = async()=>{
   await mongoose.connect(url, {
        useNewUrlparser:true,
        useUnifiedTopology:true,
    });

    console.log("mongodb is connected")
}

export {connectMongodb};