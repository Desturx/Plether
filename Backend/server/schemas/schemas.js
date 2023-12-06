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


const userSchema = mongo.model("User", UserSchema);
const pointsSchema = mongo.model("Points", PointsSchema);
const notificationSchema = mongo.model("Notification", NotificationSchema)

module.exports = {UserModel: userSchema, PointsModel: pointsSchema, NotifModel: notificationSchema};
