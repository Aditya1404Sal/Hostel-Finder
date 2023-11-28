const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { Server } = require('socket.io');
const { createServer } = require('http');
// ...
//dotenv config

dotenv.config();

//this will establish mongo-db connection 

connectDB();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const httpserver = createServer(app)
const io = new Server(httpserver,{
  cors:{
    origin:true,
    credentials:true
  },
});
//websocket WIP

io.on('connection', socket => {

  socket.once('joinRoom', roomCode => {
    console.log("joined room")
    socket.join(roomCode);
  });

  socket.on('chatMessage', msg => {
    socket.to(msg.room).emit('message', msg);
  });

});
const wsPort = process.env.WSPORT
httpserver.listen(wsPort)
console.log(`websocket initialised on port ${wsPort}`.bgMagenta)

//routes

app.use('/api/v1/user',require('./routes/userRoutes'));

//port 

const port = process.env.PORT

//server listener 
app.listen(port,()=>{
    console.log(`server is running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`.bgGreen.bgWhite);
}); 