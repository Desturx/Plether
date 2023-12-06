require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser')


// Middleware
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(cookieParser());

// DB CONNECTION
mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`), 
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
    console.log(`Connected succesfully to ${process.env.DBNAME}`)
})

// ROUTES


const users = require('./routes/api/users');
const points = require('./routes/api/points');
const notifications = require('./routes/api/notifications');


app.use('/api/users', users)
app.use('/api/points', points)
app.use('/api/notifications', notifications)



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});
// const socketIo = require('socket.io')
// const io = socketIo(server)


const { NotifModel }  = require("./schemas/schemas");

// NotifModel.watch().on('change', (change)=>{
//     console.log("database change", change)
// })

io.on('connection', (socket)=>{
    const userId = socket.handshake.query.userId;
    socket.join(userId)
    
    console.log("A user connected")
    
    socket.on('disconnect', ()=> {
        console.log('A user disconnected')
    })

    socket.on('notification created', async (data)=>{
        try{
            const notification = new NotifModel(data);
            await notification.save();
            io.to(data.userId).emit('notification created', notification)
        } catch (error) {
            console.log(error)
        }
    })
});

server.listen(3000, ()=>{
    console.log('Socket server running on port 3000')
})

