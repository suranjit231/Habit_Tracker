
import HabitsRepository from "../repository/habits.repository.js";
import mongoose from "mongoose";
export default class HabitController{
    constructor(){
        this.habitRepository = new HabitsRepository();
    }

    formatDate(date) {
        const options = { month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
      }

    async addHabits(req,res,next){
        try{
            const {title, habitDesc, _id } = req.body;
            if(!title.trim() || !habitDesc.trim() || !_id){
                return res.redirect("/all-habits?error=Title or Habits desc can't be empty");
            }
            const result= await this.habitRepository.addHabits(title,habitDesc,_id);
        
            if(result.success){
            const habitData=await this.habitRepository.getAllUserHabits(_id);
            console.log("habitsData : ", habitData);
            req.flash('success', 'Havits added sucessfully!');
        
            }
         //.....redirect the routes for rendering all habits
         return res.redirect("/all-habits");


        }catch(error){
            res.status(404).send(error.message);
        }

    }

     //...... update complete status habits

async updateStatus(req, res, next) {
    try {
        const { habitId, index, status } = req.body;
        // Update status in the database
        await this.habitRepository.updateStatus(habitId, index, status);
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ success: false, message: 'Failed to update status'});
    }
}

async getAllUserHabits(req,res,next){
    try{
        const userId=req.session.userId;
        const user = req.session.name;
        let upmsg = req.query.upmsg;


        const habitData=await this.habitRepository.getAllUserHabits(userId);
        let error = req.query.error;
        if(!error){
            error=null;
        }
       
        let successMessage = req.flash('success');
        if(upmsg){
            successMessage = upmsg;
        }
        console.log("sucess message console in habits controller : ", successMessage);
        return res.status(200).render("weekly_view", { email: req.session.email, user:user, habits: habitData.allHabits, formatDate: this.formatDate, successMessage:successMessage, error:error });

    }catch(error){
        console.log(error);
    }
    
}

//.......get habits by habits Id
async getHabitsById(req,res,next){
    try{
        const habitId= req.params.habitId;
        console.log("habits id for update :", habitId);
       const result=await this.habitRepository.getHabitsById(habitId);
       if(result.success){
        return res.json({success:true, habit:result.habit});
       }else {
        // Handle the case where the habit is not found
        return res.status(404).json({ success: false, message: 'Habit not found' });
    }


    }catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


//............controller methods for deleting habits
async deleteHabits(req,res,next){
    try{
        const habitId = req.query.habitId;
        console.log("delete habitsId: ", habitId);
        const userId = req.session.userId;

       const deleteResult=await this.habitRepository.deleteHabits(userId,habitId);
       if(deleteResult.success){
       // return res.redirect("/all-habits?");
        return res.redirect("/all-habits?upmsg=Habit deleted sucessfully!");
       }

    }catch(error){
        console.log(error);
    }
}

formateCreatedDate(habit){
    // Parse the timestamp into a Date object
const createdAtDate = new Date(habit.createdAt);
// Get the month and day
const month = createdAtDate.toLocaleString('default', { month: 'short' });
const day = createdAtDate.getDate();

// Concatenate month and day
const monthDay = `${month} ${day}`;
return monthDay;
}

//..........show daily habits
async showDailyHabits(req,res,next){
    try{
        const userId=req.session.userId;
        const user = req.session.name;
        const habitData=await this.habitRepository.getAllUserHabits(userId);

       

        const successMessage = req.flash('success');
        return res.status(200).render("showDaily", { email: req.session.email, user:user, habits: habitData.allHabits, formateCreatedDate: this.formateCreatedDate, successMessage:successMessage, error:null });
    }catch(error){
        console.log(error);
    }
}


//........ update habits
async updateHabits(req,res,next){
    try{
        const userId = req.body._id;
        const habitId = req.body.habitId;
        const title = req.body.title;
        const habitDesc = req.body.habitDesc;
        const user = req.session.name;
        let error = null;
        let successMessage = null;
        const habitData=await this.habitRepository.getAllUserHabits(userId);
        if(!habitId.trim() || !title.trim() || !habitDesc.trim()){
            error="Empty field error!";
        return res.status(200).render("showDaily", { email: req.session.email, user:user, habits: habitData.allHabits, formateCreatedDate: this.formateCreatedDate, successMessage:successMessage, error:error });

        }

        const updateResult= await this.habitRepository.updateHabits(userId,habitId,title, habitDesc);
        if(!updateResult.success){
            error=updateResult.msg;
            return res.status(200).render("showDaily", { email: req.session.email, user:user, habits: habitData.allHabits, formateCreatedDate: this.formateCreatedDate, successMessage:successMessage, error:error });
        }else{
            error=null;
            successMessage=updateResult.msg;
            console.log("sucess message: ", successMessage);
            const habitData = await this.habitRepository.getAllUserHabits(userId);
            return res.status(200).render("showDaily", { email: req.session.email, user:user, habits: habitData.allHabits, formateCreatedDate: this.formateCreatedDate, successMessage:successMessage, error:error });
        }

    }catch(error){
        console.log("update habits error: ", error);
        return res.status(404).send(error.message);
        
    }
}



}