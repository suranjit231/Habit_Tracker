import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    title:{
        type:String,
    },

    habitDesc:{
        type:String

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dates: [{
        date: String,
        complete: String,
    }],
    
    },{
        timestamps: true,

    })

    const habitModel= mongoose.model("Habit", habitSchema);
    export default habitModel;