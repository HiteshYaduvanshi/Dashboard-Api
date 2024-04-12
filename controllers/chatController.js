const Chat = require("../models/ChatModel");
const User = require("../models/UserModel");

const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("userID is not send to the server")
    return res.sendStatus(400);
  }
  let isChat = await Chat.find({
    isGroupedChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "username imageName email",
  });

  if (isChat.length > 0) {
    res.json(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupedChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const fetchChat = async (req, res) => {
    try {
      const results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });
  
      const populatedResults = await User.populate(results, {
        path: "latestMessage.sender",
        select: "username imageName email",
      });
  
      res.status(200).json(populatedResults);
    } catch (error) {
      console.error("Error fetching chat:", error);
      res.status(500).json({ error: "Server error" });
    }
  };  

module.exports = { accessChat, fetchChat };
