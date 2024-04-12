const express = require("express");
const authRouter = require("./router/auth-router");
const employeeRouter = require("./router/employee-router")
const chatRouter = require("./router/chat-router")
const messageRouter = require('./router/message-router')
const app = express();
const connectDatabase = require("./utils/databaseConnection");
const cors = require('cors')


const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json())

app.use(authRouter);

app.use('/images', express.static('uploads'));

app.use(employeeRouter)

app.use(chatRouter)

app.use(messageRouter)


const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  pingTimeout: 60000,
});

connectDatabase().then(() => {
  const port = 5001;
  http.listen(port, () => {
    console.log(`listening on port number ${port}`);
    
  });
});

io.on('connection', (socket) => {
  console.log('Connection established to socket');
  socket.on("setup", (userData) => {
    console.log("user id from client",userData);
    socket.join(userData)
    socket.emit('connected')
  })

  socket.on("join chat",(room)=>{
    socket.join(room)
    console.log("user joined room:"+ room );
  })

  socket.on("new message",(newMessageRecevied)=>{
    console.log(newMessageRecevied);
    let chat = newMessageRecevied.chat
    console.log(chat);
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      console.log(user._id,newMessageRecevied.sender._id);
      if (user._id == newMessageRecevied.sender._id) {
        return
      };

      socket.in(user._id).emit("message recieved", newMessageRecevied);
  })
})
})