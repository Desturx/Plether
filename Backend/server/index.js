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

app.use('/api/users', users)
app.use('/api/points', points)
// app.use('/api/users',allowCORS, users);
// app.use('/api/points',allowCORS, points);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));