require("dotenv").config();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const Attendence = require("../models/Attendence");
const { format } = require("date-fns");

const register = async (req, res) => {
  const { username, email, password, phone, designation } = req.body;
  const imageName = req.file.filename;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.status(501).send({ message: "Email already exists" });
  }
  const userCreated = await User.create({
    username,
    email,
    phone,
    password,
    designation,
    imageName,
  });
  const token = await userCreated.generateJwtToken();
  res
    .status(200)
    .json({ userCreated, token, userID: userCreated._id.toString() });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (passwordMatch) {
      const token = await userExist.generateJwtToken();
      res
        .status(200)
        .json({ message: "login ok", token, userID: userExist._id.toString() });

      const date = format(new Date(), "dd/MM/yyyy");
      
      const existingAttendance = await Attendence.findOne({
        user: userExist._id,
        date: date,
      });

      if (!existingAttendance) {
        const attendance = new Attendence({
          user: userExist._id,
          date: date,
          checkInTime: new Date(),
        });
        await attendance.save();
      }
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    const { userId } = req.body;
    const currentDate = format(new Date(), "dd/MM/yyyy");

    const attendance = await Attendence.findOne({
      user: userId,
      date: currentDate,
    });

    if (!attendance) {
      return res.status(400).json({ message: "Attendance record not found" });
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const clientData = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.log("error from user route", error);
  }
};

const changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
  }
};

const getAllClient = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const getAttendance = async (req, res) => {
  try {
    const user = req.userId;

    const attendence = await Attendence.find({ user: user });
    return res.status(200).json({ attendence });
  } catch (error) {
    console.log("error from attendence route", error);
  }
};

const takeBreak = async (req, res) => {
  try {
    const { userId } = req.body;
    const currentDate = format(new Date(), "dd/MM/yyyy");

    const attendance = await Attendence.findOne({
      user: userId,
      date: currentDate,
    });

    if (!attendance) {
      return res.status(400).json({ message: "Attendance record not found" });
    }

    if (attendance.breakStart !== null) {
      return res.status(400).json({ message: "Break already started" });
    }

    attendance.breakStart = new Date();
    await attendance.save();

    res.status(200).json({ message: "Break started" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const endBreak = async (req, res) => {
  try {
    const { userId } = req.body;
    const currentDate = format(new Date(), "dd/MM/yyyy");

    const attendance = await Attendence.findOne({
      user: userId,
      date: currentDate,
    });

    if (!attendance) {
      return res.status(400).json({ message: "Attendance record not found" });
    }

    attendance.breakEnd = new Date();
    await attendance.save();

    res.status(200).json({ message: "break Start" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Email Not Found" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // Send password reset email containing the token
    // Implement this part using Nodemailer or any other email service
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  clientData,
  changePassword,
  getAllClient,
  logout,
  getAttendance,
  takeBreak,
  endBreak,
  forgotPassword,
};
