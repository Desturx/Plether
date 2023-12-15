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
    others : {
        type:[],
    },
    read: Boolean

})

const ChallengeSchema = new mongo.Schema({
    recieverId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    recieverName: {
        type: String,
    },
    senderName: {
        type: String,
    },
    senderPoints: {
        type: Number
    },
    recieverPoints: {
        type: Number
    }
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
    gameId: { 
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
})




const userSchema = mongo.model("User", UserSchema);
const pointsSchema = mongo.model("Point", PointsSchema);
const notificationSchema = mongo.model("Notification", NotificationSchema);
const gameSchema = mongo.model("Game", GameSchema);
const challengeSchema = mongo.model("Challenge", ChallengeSchema)

module.exports = {
    UserModel: userSchema,
    PointsModel: pointsSchema,
    NotifModel: notificationSchema,
    GameModel: gameSchema,
    ChallengeModel: challengeSchema,
};
