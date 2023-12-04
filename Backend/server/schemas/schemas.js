const mongo = require("mongoose");



const UserSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    mail: { 
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: {
        type: [],
    },
    friendRequests : {
        type:[],
    },
});

const PointsSchema = new mongo.Schema({ 
    userID: {
        type: String,
        required: true,
    },
    gameID: { 
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    }
})




const userSchema = mongo.model("User", UserSchema);
const pointsSchema = mongo.model("Points", PointsSchema);

module.exports = {UserModel: userSchema, PointsModel: pointsSchema};