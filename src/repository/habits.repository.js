import mongoose from "mongoose";
import habitModel from "../model/habitSchema.js";
import { ObjectId } from "mongodb";
import userModel from "../model/userSchema.js";

export default class HabitsRepository {

    async addHabits(title, habitDesc, _id) {
        try {
            const user = await userModel.findOne({ _id: new ObjectId(_id) });
            if (!user) {
                return { success: false, msg: "User not found" };
            }

            const dates = [];
            // Loop to generate dates for the previous 7 days
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                dates.push({ date: formatDate(date), complete: "none" });
            }

            const existingHabit = await habitModel.findOne({ user: new ObjectId(_id), title: title });
            
           
                const newHabit = new habitModel({
                    title: title,
                    habitDesc: habitDesc,
                    user: new ObjectId(_id),
                    dates: dates
                });
                const savedHabit = await newHabit.save();
                
    
                return { success: true, savedHabit: savedHabit, user: user };

            

            

        } catch (error) {
            throw new Error("Something went wrong, please try later!");
        }
    }

    async getAllUserHabits(_id) {
        try {
            const allHabits = await habitModel.find({ user: new ObjectId(_id) }).populate('user', 'name');;
            return { allHabits: allHabits };

        } catch (error) {
            console.log(error);
        }
    }

    //.........update the habits stsus
  

async updateStatus(habitId, index, status) {
    try {
        // Find habit by ID and update the status for the specified index
        const habit=await habitModel.findOne({_id:new ObjectId(habitId)});
        const updateResult = await habitModel.updateOne(
            { 
                _id: habitId, 
                'dates': { $elemMatch: { date:habit.dates[index].date } } 
            },
            { $set: { 'dates.$.complete': status } }
        );

        // Check if the update was successful
        if (updateResult.nModified === 0) {
            throw new Error('No habit was updated');
        }

        console.log("updateResult: ", updateResult);
        return { success: true };
    } catch (error) {
        console.error('Error updating status in the database:', error);
        throw new Error('Failed to update status in the database');
    }
}


//........ deleting the habits
async deleteHabits(userId, habitId){
    try{
        const deleteResult=await habitModel.deleteOne({_id:habitId, user:userId});

        if(deleteResult.deletedCount>0){
            return {success:true, msg:"habits deleted"};
        }

    }catch(error){
        console.log(error);
    }

}

  //......get Habits By habits Id
  async getHabitsById(habitId){
    try{
        const habit= await habitModel.findOne({_id:habitId});
        if(habit){
            return {success:true, habit:habit};
        }else{
            return {success:false}
        }

    }catch(error){
        console.log(error);
    }
  }  

  //.....update habits
  async updateHabits(userId,habitId,title, habitDesc){
    try{
        let habit = await habitModel.findOne({_id:new ObjectId(habitId), user:new ObjectId(userId)});
        if(!habit){
            return {success:false, msg:"No habits find with this ID"};
        }

        habit.title = title;
        habit.habitDesc=habitDesc;

        const updateSaved= await habit.save();
        return{success:true, msg:"Habit is updated!"}


    }catch(error){
        throw new Error(error);
    }
  }
   
    
}

function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;

  
    return `${month}-${day}`;
}