const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { accessChat, fetchChat } = require("../controllers/chatController");

router.route("/accessChat").post(authMiddleware, accessChat);
router.route("/fetchChat").get(authMiddleware, fetchChat);

module.exports = router;
