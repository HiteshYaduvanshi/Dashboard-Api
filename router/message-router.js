const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { sendMessage, allMessage } = require("../controllers/messageController");

const router = express.Router();

router.route("/sendMessage").post(authMiddleware, sendMessage);
router.route("/sendMessage/:chatID").get(authMiddleware, allMessage);

module.exports = router;
