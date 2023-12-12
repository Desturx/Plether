const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { PointsModel, GameModel }  = require("../../schemas/schemas");

// /api/points
router.get('/', async(req, res)=>{
    try {
        const points = await PointsModel.find({})
        res.status(200).send(points)
    } catch(err) {
        res.status(500).send(error)
    }
})

router.get('/:userId', async(req, res)=>{
    try {
        const points = await PointsModel.find({userId: req.params.userId})
        res.status(200).send(points)
    } catch(err) {
        res.status(500).send(error)
    }
})

router.get('/:userId/:gameId', async(req, res) =>{
    try {
        const points = await PointsModel.find({userId: req.params.userId, gameId:req.params.gameId}).sort({points: -1})
        res.status(200).send(points)
    } catch(err) {
        res.status(500).send(error)
    }
})


router.post('/', async(req,res)=>{
    const {userId, gameId, points, date } = req.body
    try {
        console.log('aqui entra')
        const score = new PointsModel(req.body)
        await score.save()
        res.status(200).send(score)
    }catch(err) {
        res.status(500).send(err)
    }
    


})


module.exports = router