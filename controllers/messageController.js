const Chat = require("../models/ChatModel");
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");

const sendMessage = async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400);
  }

  try {
    let messageCreated = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });
    messageCreated = await messageCreated.populate(
      "sender",
      "username imageName",
    );
    messageCreated = await messageCreated.populate("chat");
    messageCreated = await messageCreated.populate("reciever");
    messageCreated = await User.populate(messageCreated, {
      path: "chat.users",
      select: "username imageName email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: messageCreated,
    });
    res.status(200).json({ messageCreated });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Server error");
  }
};

const allMessage = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatID })
      .populate("sender", "username imageName email")
      .populate("reciever")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = { sendMessage, allMessage };
