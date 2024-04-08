import { User } from "../models/User.model.js";
import { Task } from "../models/Task.model.js";

function adminController()
{
    return{
        async getUsers(req,res)
        {
            try {
                const users = await User.find({isAdmin:false});
                res.status(200).json(users)
            } catch (error) {
                res.status(400).json({message: error.message})
            }
        },

        async getUserTask(req,res)
        {
            console.log(req.params.id)
            try {
                const tasks = await Task.findById({createdBy:req.params.id})
                res.status(200).json(tasks)
            } catch (error) {
                console.log(error)
            }
        },

        async completeTask(req,res)
        {
            const id = req.params.id;
            try {
                const task = await Task.findByIdAndUpdate({_id:id},{completed:true},{new:true});
                res.status(200).json(task)
            } catch (error) {   
                console.log(error)
            }
        },

        async deleteUser(req,res)
        {
            const id = req.params.id;
            console.log(id)
            try {
                const user = await User.findByIdAndDelete({_id:id});
                res.status(200).json(user)
            } catch (error) {   
                console.log(error)
            }
        }
    }
}

export default adminController;