const express=require("express")
const app=express();

const http=require("http").createServer(app)

const PORT=process.env.PORT ||7000; 

// const io=require("socket.io")(7000)
const io = require('socket.io')(PORT, {
    cors: {
      origin: '*',
    }
  });
const users={};  


io.on("connection",(socket) =>{
    // console.log("connect successfully");
    socket.on("newuserjoin",name=>{
        // console.log("new user", name);

        users[socket.id]=name;
        socket.broadcast.emit("userjoin",name)
    })
    socket.on("send",(message)=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]});

    })

    socket.on("disconnect",message=>{
      socket.broadcast.emit("left",users[socket.id]);
      delete users[socket.id];
    })
})

// http.listen(PORT,()=>{
//     console.log(`connecting server ${PORT}`);
// })