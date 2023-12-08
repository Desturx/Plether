const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const { UserModel, PointsModel }  = require("../../schemas/schemas")
const { UserModel }  = require("../../schemas/schemas");

const { generateAccessToken, authenticateToken } = require('../../auth/jwt');

/*
    ---- STATUS CODES ----
    200 - Ok
    400 - Bad Request. Ex: user already exists
    404 - Resource not found
    403 - Forbidden. Client doesn't have access
*/
// '/' = '/api/users/'


// ==== GET ====
// Get all the users
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await UserModel.find({});
        
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Get a specific user
router.get('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)

        if(user != null) {
           return res.status(200).json({user})
        } else {
            res.status(404).json({ error: 'User not found' })
        }

    } catch(error) {
        res.status(500).send(error)
    }
    
})

// Get the friend requests for a specific user
router.get('/friend-request/:id', async (req, res) => {
    
    const friendRequests = await UserModel.findById(req.params.id).select('friendRequests -_id')

    if(friendRequests === null){
        return res.status(404).json({ error: 'User not found'})
    } else {
        res.status(200).send(friendRequests)
    }
})

router.get('/friends/:id', authenticateToken, async (req, res) => {
    const friends = await UserModel.findById(req.params.id).select('friends -_id')
    if(friends === null) {
        return res.status(200)
    } else {
        return res.status(200).send(friends)
    }
})

// ==== Post ====
// Register a new user
router.post('/', async (req, res) => {
    
    const user = new UserModel(req.body);
    const existingMail = await UserModel.findOne({mail: req.body.mail})
    // console.log(existingMail)
    if(existingMail !== null) {
        // console.log("hehehehe")
        return res.status(401).json({error: 'user already exists'})
    } 

    
    try {
        const salt = bcrypt.genSaltSync(8);
        user.password = bcrypt.hashSync(user.password, salt)
        await user.save();

        const token = generateAccessToken(user)
        res.cookie("SessionID", token, {
            maxAge: 24 * 60 * 60 * 1000, //Caduca en 24horas. Porque las fechas de javascript funcionan en milisegundos
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/auth', authenticateToken, async (req, res) => {
    if(req.user !== null && req.success) {
        res.json({success: true})
        // console.log("siii")
    }

})  

router.post('/login', async (req, res) => {
    // Login steps
    // console.log("entra en login")
    // 1- check if the username(mail) exists, if it doesn't exist return 401 account doesn't exist
    const user = await UserModel.findOne({mail: req.body.mail})
    // console.log(user)
    if(user === null) {
        return res.status(401).json({ error: "Account doesn't exist"})
    }
    // 2- check if the password exists, if isnt valid send a 401 Invalid email or password\
    var passOk = bcrypt.compareSync(req.body.password, user.password)
    // console.log(passOk)
    if(!passOk) {
        return res.status(401).json({error: "invalid email or password. Try again"})
    }

    // 3- generate a token
    const token = generateAccessToken(user)
    // 4- send the token with a cookie
    res.cookie("SessionID", token, {
        maxAge: 24 * 60 * 60 * 1000, //Caduca en 24horas. Porque las fechas de javascript funcionan en milisegundos
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    const dataToSend = {
        name: user.name,
        mail: user.mail,
        id: user._id
    }
    
    // 5- send the 200 OK
    res.status(200).json({success: true, user: dataToSend})
    


})

// Send user a friend request
router.post('/friend-request/', async (req, res) =>{
    
    try {

        var userRequested = await UserModel.findOne({mail: req.body.friendMail, "friendRequests.mail":req.body.mail })
        
        if(userRequested !== null) {
            return res.status(400).json( {error : 'solicitud ya enviada'})
        }

        var userRequesting = await UserModel.findOne({mail: req.body.mail}).select('name mail').lean(true)
        const id = new mongoose.Types.ObjectId();
        userRequesting._id = id
        
        const newUser = await UserModel.findOneAndUpdate(
            { mail: req.body.friendMail },
            { $push: { friendRequests: userRequesting } },
            { new: true }
        )

        if(newUser != null) {
            return res.status(200).send(newUser)//TO-DO ELIMINAR QUE MANDE AL USUARIO AL COMPLETO CON CONTRASEÑA Y TODO
        }
        res.status(400).json( {error : 'bad petition'})
        
    }catch(error) {
        res.status(500).send(error);
    }    

});

// Accept an user's friend request.
router.post('/accept-request', async (req, res) => {
    //T0-DO terminar de gestionar los errores y comprobar que funciona bien del todo
    // const { userId } = req.body
    // userID, requestId
    try{
        var friendRequest = await UserModel.findOne({_id: req.body.userId }).select('friendRequests -_id')    
        const newFriend = friendRequest.friendRequests.find(e => e._id.toString() === req.body.requestId)
        const newid = new mongoose.Types.ObjectId();
        newFriend._id = newid
    
        const newUser = await UserModel.findOneAndUpdate(
            { _id: req.body.userId },
            { 
                $push: { friends: newFriend },
                $pull: { friendRequests: { _id: new mongoose.Types.ObjectId(req.body.requestId) } },
            },
            { select:'-password',safe:true,new: true }
        )

        const newFriend2 = {
            _id: new mongoose.Types.ObjectId(),
            name: newUser.name,
            mail: newUser.mail
        }

        const newUser2 = await UserModel.findOneAndUpdate(
            { mail: newFriend.mail  },
            {
                $push: {friends: newFriend2 }
            },
            {select: '-password', safe:true, new: true}
        )
        res.send(newUser2)

    } catch(error) {
        res.status(500).send(error)
    }
}) 

// Decline a friend request
router.post('/decline-request', async (req, res) => {

    try{
        var friendRequest = await UserModel.findOne({_id: req.body.userId, "friendRequests._id":req.body.requestId}).select('friendRequests -_id')    

        if(friendRequest !== null) {
            const newUser = await UserModel.findOneAndUpdate(
                { _id: req.body.userId },
                { 
                    $pull: { friendRequests: { _id: new mongoose.Types.ObjectId(req.body.requestId) } },
                },
                { safe:true,new: true }
            )
            return res.status(200).send(newUser)
        }
        else 
            return res.status(400).json({error: 'No existe la petición solicitada'})

    } catch(error) {
        res.status(500).send(error)
    }
}) 



router.post('/test', async (req, res) => {
    
    // const user = await UserModel.findOne({_id: req.body.userId})
    // console.log(user)
    // console.log(req.body.userId)
    const user = await UserModel.findOne({_id: req.body.userId}).select('-password -friends -friendRequests')
    // console.log(user)
    const token = generateAccessToken(user)
    // console.log(token)
    res.json({success: true, token: token})

    // const token = generateAccessToken(user)
    // res.status(200).json(token)

    /* 
    --PARA SACAR UN ITEM DE UN ARRAY DE OBJETOS--
    var userRequested = await UserModel.findOne({_id: req.body.userId }).select('friendRequests -_id')
    const myObject = userRequested.friendRequests.find(e => e._id.toString() === req.body.requestId)
    console.log(myObject)
    */

    // var userRequested = await UserModel.findOne({mail: req.body.friendMail, "friendRequests.mail":req.body.mail })
    // if(userRequested != null) {
    //     console.log(userRequested)
    // } else {
    //     console.log("no lo encontró")
    // }
    // res.send("ok")
});


// ==== DELETE ====
router.delete('/:id', async (req, res) => {
    try {
       await UserModel.deleteOne({_id: req.params.id})
       res.status(200).send({
        "_id":`${req.params.id}`,
        "status":"deleted"
       })
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router;