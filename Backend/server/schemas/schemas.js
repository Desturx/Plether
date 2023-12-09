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

const NotificationSchema = new mongo.Schema({
    recieverId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    senderName: {
        type: String
    },
    message: {
        type: String,
        required: true,
    },
    read: Boolean

})

const GameSchema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
})

const PointsSchema = new mongo.Schema({ 
    userId: {
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
const pointsSchema = mongo.model("Point", PointsSchema);
const notificationSchema = mongo.model("Notification", NotificationSchema);
const gameSchema = mongo.model("Game", GameSchema);

module.exports = {
    UserModel: userSchema,
    PointsModel: pointsSchema,
    NotifModel: notificationSchema,
    GameModel: gameSchema 
};
