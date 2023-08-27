const http = require ("http");
const express = require ("express");
const cors = require ("cors");
const socketIO = require ("socket.io");

const app = express();
const port = 3000;

const users = [{}];

app.use(cors());
app.get("/", (req,res)=> {
    res.send("Hell it is WORKING");
})

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
    console.log("New Connection");

   socket.on('joined', ({user}) =>{
    users[socket.id]= user;
    console.log(`${user} has joined`);
    socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` });
    socket.emit('welcome', { user: "Admin", message: `Welcome to the Chat, ${users[socket.id]}` });
   })
    
   socket.on('message', ({message, id}) => {
    io.emit('sendMessage', { user:users[id],message,id});
})


   socket.on('disconnect',() => {
     socket.broadcast.emit('leave', { user: "Admin", message: ` ${users[socket.id]}  has left` });
   console.log('User left');
})
  

   


});

server.listen(port, () => {
    console.log(`Server working on port http://localhost:${port}`);
});







