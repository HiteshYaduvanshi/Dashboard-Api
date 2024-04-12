const Leave = require("../models/LeaveModel");
const Project = require("../models/ProjectModel");
const Task = require("../models/TaskModel");
const Ticket = require("../models/TicketModel");
const User = require("../models/UserModel");

const addLeave = async (req, res) => {
  try {
    const { user, startDate, endDate, leaveType, leaveReason } = req.body;

    const leaveCreated = await Leave.create({
      startDate,
      endDate,
      leaveType,
      leaveReason,
      user,
    });

    res.status(200).json({ leaveCreated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const userData = req.userId;
    const leaveData = await Leave.find({ user: userData });
    return res.status(200).json({ leaveData });
  } catch (error) {
    console.log("error from leave route", error);
  }
};

const addProject = async (req, res) => {
  try {
    const { projectTitle, startDate, endDate, priority, user, id } = req.body;
    const projectCreated = await Project.create({
      projectTitle,
      startDate,
      endDate,
      priority,
      user,
      id,
    });
    res.status(200).json({ projectCreated });
  } catch (error) {
    console.log("error from add project", error);
  }
};

const getProject = async (req, res) => {
  try {
    const userData = req.userId;
    const projectData = await Project.find({ user: userData });
    return res.status(200).json({ projectData });
  } catch (error) {
    console.log("error from leave route", error);
  }
};

const addTask = async (req, res) => {
  try {
    const { project, status, type, priority, details, user, id } = req.body;
    const taskCreated = await Task.create({
      project,
      status,
      type,
      priority,
      details,
      user,
      id,
    });
    res.status(200).json({ taskCreated });
  } catch (error) {
    console.log("error from add task", error);
  }
};

const getTask = async (req, res) => {
  try {
    const userData = req.userId;
    const taskData = await Task.find({ user: userData });
    return res.status(200).json({ taskData });
  } catch (error) {
    console.log("error from leave route", error);
  }
};

const addTicket = async (req, res) => {
  try {
    const { ticketSubject, priority, user } = req.body;
    const ticketCreated = await Ticket.create({
      ticketSubject,
      priority,
      user,
    });
    res.status(200).json({ ticketCreated });
  } catch (error) {
    console.log("error from add ticket", error);
  }
};

const getTicket = async (req, res) => {
  try {
    const userData = req.userId;
    const ticketData = await Ticket.find({ user: userData });
    return res.status(200).json({ ticketData });
  } catch (error) {
    console.log("error from leave route", error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search ? {
      $or: [
        {name: { $regex: req.query.search, $options: "i"}},
        {email: { $regex: req.query.search, $options: "i"}},
      ]
    }: {}

    const users = await User.find(keyword).find({_id: {$ne:req.user._id}})
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  addLeave,
  getLeaves,
  addProject,
  getProject,
  addTask,
  getTask,
  addTicket,
  getTicket,
  getAllUsers,
};
