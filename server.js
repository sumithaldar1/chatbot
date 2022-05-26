const express = require('express');
const path = require('path');
const http= require('http');
const socketio=require('socket.io');
const formatMessage= require ('./utils/messages');
const { userjoin,getuser}= require ('./utils/users');


const app=express();
const server=http.createServer(app);
const io=socketio(server);

app.use(express.static(path.join(__dirname,'public')));

const botname = 'ChatCord bot';

io.on('connection',socket =>{
    socket.on('joinroom',({username,room})=>{
        const user=userjoin(socket.id,username,room);

        socket.join(user.room);
        socket.emit('message',formatMessage(botname,'Welcome to Chatcord!!!'));

    socket.broadcast.to(user.room).emit('message',formatMessage(botname,`${user.username} has joined the chat`));

    })
    
    

    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(botname,'A user has left the chat'));
    });

    socket.on('chatMessage',msg => {
        console.log(msg);
        io.emit('message',formatMessage('USER',msg));
    });

    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(botname,'A user has left the chat'));
    });
});

const PORT= 5000 || process.env.PORT;

server.listen(PORT,() => console.log(`Server listening ${PORT}`));
