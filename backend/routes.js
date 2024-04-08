import express from 'express'
const router = express.Router();
import authController from './controllers/authController.js'
import taskController from './controllers/taskController.js'
import adminController from './controllers/adminController.js'

router.post('/api/signin',authController().signin)
router.post('/api/signup', authController().signup)
router.post('/api/signout',authController().signout)

// task controllers

router.post('/api/newTask', taskController().newTask)
router.get('/api/getTask/:id', taskController().getTask)
router.delete('/api/deleteTask/:id', taskController().deleteTask)
router.put('/api/editTask/:id', taskController().editTask)

// admin routes
router.get('/api/users', adminController().getUsers)
router.get('/api/getTask/:id', adminController().getUserTask)
router.put('/api/completeTask/:id', adminController().completeTask)
router.delete('/api/deleteUser/:id', adminController().deleteUser)

export default router