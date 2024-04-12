const express = require('express')
const router =  express.Router()
const {addLeave,getLeaves,addProject, getProject, addTask, getTask, addTicket, getTicket,getAllUsers} = require('../controllers/employeeController')
const authMiddleware = require('../middleware/authMiddleware')

router.route('/add-leaves').post(addLeave)
router.route('/get-leaves').get(authMiddleware,getLeaves)
router.route('/add-project').post(addProject)
router.route('/get-project').get(authMiddleware,getProject)
router.route('/add-task').post(addTask)
router.route('/get-task').get(authMiddleware,getTask)
router.route('/add-ticket').post(addTicket)
router.route('/get-ticket').get(authMiddleware,getTicket)
router.route('/get-users').get(authMiddleware,getAllUsers)

module.exports = router