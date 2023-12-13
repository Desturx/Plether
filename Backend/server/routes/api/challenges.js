const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ChallengeModel }  = require("../../schemas/schemas");
const { authenticateToken } = require('../../auth/jwt');


router.post('/', async (req, res)=>{
    
    try {
        var isChallengedAlready = await ChallengeModel.findOne({senderId: req.body.senderId, recieverId: req.body.recieverId})
        // console.log("aqui llega")
        if(isChallengedAlready !== null) {
            return res.status(400).json({error: 'user already challenged'})
        }

        const challenge = new ChallengeModel(req.body)
        await challenge.save()
        res.status(200).send(challenge)

    } catch(error) {
        res.status(500).send(error);
    }
})

router.post('/updateScore', async (req, res) => {
    const {senderId, recieverId, senderPoints, recieverPoints} = req.body
    console.log("el body: ", req.body)
    console.log("aqui entra")
    try {
        
        // if(senderPoints !== "" || senderPoints !== null) {
        if(req.body.hasOwnProperty('senderPoints') && senderPoints !== "") {
            console.log("actualiza los puntos del emisor")
            var challenge = await ChallengeModel.findOneAndUpdate(
                {
                    senderId: senderId,
                    recieverId: recieverId
                },
                {
                    senderPoints: senderPoints
                },
                { new: true }
            )

            // return res.status(200).send(challenge)
        }
        else if(req.body.hasOwnProperty('recieverPoints') && recieverPoints !== "") {
            console.log("actualiza los puntos del recibido")
            var challenge = await ChallengeModel.findOneAndUpdate(
                { senderId: senderId, recieverId: recieverId },
                {
                    recieverPoints: recieverPoints
                },
                { new: true }
            )

        }
        res.status(200).send(challenge)
        
    } catch(error) {
        // console.log(error)
        res.status(500).send(error)
    }
})

router.get('/', async (req, res)=> {
    
    try {
        const challenges = await ChallengeModel.find({})
        res.status(200).send(challenges)

    } catch(err) {
        res.status(500).send(err)
    }   
})

router.get('/:userId', async (req, res)=>{
    try {
        // const challenges = await ChallengeModel.find({senderId: req.params.userId})
        const challenges = await ChallengeModel.find({
            $or: [
                {senderId: req.params.userId},
                {recieverId: req.params.userId}
            ]
        })
        res.status(200).send(challenges)
    } catch(err) {
        res.status(500).send(err)
    }
})

router.get('/challenge/:id', async (req, res) =>{
    const challenge = await ChallengeModel.findById(req.params.id)
    console.log(challenge)
    try {
        if(challenge != null) {
            return res.status(200).send(challenge)
        } else {
            return res.status(404).json({error: 'challenge not found'})
        }
    } catch(err) {
        res.status(500).send(err)
    }
})



module.exports = router;