const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { NotifModel }  = require("../../schemas/schemas");
const { authenticateToken } = require('../../auth/jwt');

// const { generateAccessToken, authenticateToken } = require('../../auth/jwt');


router.post('/', async (req, res) => {
    const { recieverId, senderId, message, senderName } = req.body;

    try {
        const notification = new NotifModel({ recieverId, senderId, senderName, message, read: false });
        await notification.save();
        res.status(201).send(notification);
    } catch (error) {
        
        res.status(500).send(error);
    }
});

router.get('/:userId', authenticateToken, async (req, res) => {
    try {
        // console.log("aqui entra");
        const notifications = await NotifModel.find({ recieverId: req.params.userId });
        res.status(200).send(notifications);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.delete('/:id', authenticateToken, async(req,res)=> {
    const { id } = req.params
    
    try {
        const deletedNotification = await NotifModel.findByIdAndDelete(id)

        if(!deletedNotification) {
            return res.status(404).send({message: 'notification not found'})
        }

        res.status(200).send({ message: 'Notification deleted', deletedNotification})

    } catch(err) {
        res.status(500).send(error)
    }
})

module.exports = router;