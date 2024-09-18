//importing express
const http = require("http")
const express = require("express");
const { Server } = require("socket.io");
// const UserRouter =require('./Routers/userRouter');
const cors = require('cors');

const UserRouter = require('./routers/userRouter')
const RoomRouter = require('./routers/roomRouter')

//initialising express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin:'http://localhost:3000'}
});
const port = 5000;


app.use(cors({
    origin : 'http://localhost:3000'
}));
app.use(express.json());
app.use('/user',UserRouter);

app.use(express.json());
app.use('/room',RoomRouter);


io.on("connection", (socket) =>{
    console.log("A New User Connected", socket.id);
    
    socket.on("message",(data) => {
        console.log(data);
        io.emit("recieve-message",data);

        
    });

    socket.on('disconnect' , () => {
        console.log("user disconnected",socket.id);
        
    } )

    
    
});
//middleware
app.use(cors({
    origin:'http://localhost:3000'
}

));
app.use(express.json());
// app.use('/user', UserRouter);

//socket.io


//route or endpoint 
app.get('/' , (req,res) => {
    res.send ('Response from express');
}) ;


server.listen( port, () => {console.log( 'server started')});
