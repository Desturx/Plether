const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { GameModel }  = require("../../schemas/schemas");
const { generateAccessToken, authenticateToken } = require('../../auth/jwt');



router.get('/', async (req, res) => {
    try {
        // const users = await UserModel.find({});
        const games = await GameModel.find({});
        res.status(200).send(games);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/:id', async(req, res)=>{
    try {
        const game = await GameModel.findById(req.params.id)
        if(game != null) {
            return res.status(200).json({game})
        } else {
            return res.status(404).json({error: 'game not found'})
        }
    } catch(err) {
        res.status(500).send(err)
    }
})

router.post('/', async(req, res)=>{
    // const {  } = req.body
    const game = new GameModel(req.body)
    
    try {
        await game.save();

        res.status(200).send(game)
    } catch(err) {
        res.status(500).send(err);
    }
})

module.exports = router;