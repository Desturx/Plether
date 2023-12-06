const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { NotifModel }  = require("../../schemas/schemas");

// const { generateAccessToken, authenticateToken } = require('../../auth/jwt');


router.post('/', async (req, res) => {
    const { userId, message } = req.body;

    try {
        const notification = new NotifModel({ userId, message, read: false });
        await notification.save();
        res.status(201).send(notification);
    } catch (error) {
        
        res.status(500).send(error);
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId });
        res.status(200).send(notifications);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;