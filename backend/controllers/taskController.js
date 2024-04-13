import { Task } from "../models/Task.model.js";

function taskController()
{
    return{
        async newTask(req,res)
        {
            const{title,content,createdFor,deadline} = req.body;
            if(!title || !content || !deadline)
            {
                res.status(404).json({message:'All fields are required'})
            }

            const newTask = new Task({
                title,
                content,
                createdFor,
                deadline
            })

            try {
                await newTask.save()
                res.status(200).json({message:'Task saved successfully'})
            } catch (error) {
                console.log(error)
            }

        },

        async getTask(req,res)
        {
            const id = req.params.id
            try {
                const tasks = await Task.find({createdFor: id})
                res.status(200).json(tasks)
            } catch (error) {
                console.log(error.message)
            }
        },

        async deleteTask(req,res)
        {
            const id = req.params.id;
            try {
                const validTask = await Task.findByIdAndDelete({_id:id})
                if(!validTask) {
                    res.status(400).json({message:'couldn`t find task with id'})
                }
                res.status(200).json({message:'Task deleted successfully'})
            } catch (error) {
                console.log(error.message)
            }
        },

        async editTask(req,res)
        {
            const id = req.params.id;
            const{title,content,deadline} = req.body;
            
            try {
                const validUser = await Task.findByIdAndUpdate({_id:id},{title,content,deadline},{new:true})
                
                if(!validUser) {
                    res.status(400).json({message:'couldn`t find task with id'})
                }
                else{
                    res.status(200).json({message:'Task edited successfully'})
                }

            } catch (error) {
                console.log(error)
            }

        }

    }
}

export default taskController;