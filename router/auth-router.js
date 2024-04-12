const express = require('express');
const {register, login, clientData, changePassword, getAllClient, logout, getAttendance, takeBreak, endBreak, forgotPassword} = require('../controllers/userController');
const router = express.Router()
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,uniqueSuffix + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

router.route('/login').post(login)
router.route('/forgot-password').post(forgotPassword)
router.route('/logout').post(logout)
router.route('/takeBreak').post(takeBreak)
router.route('/endBreak').post(endBreak)
router.route('/attendance').get(authMiddleware,getAttendance)
router.route('/register').post(upload.single('profileImage'),register);
router.route('/getData').get(authMiddleware,clientData)
router.route('/changePassword').post(changePassword)
router.route('/getAllclient').get(authMiddleware,getAllClient)

module.exports = router