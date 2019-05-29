const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Achievement = require('../models/achievement');

router.post('/create', (req, res, next) => {
    const achievement = new Achievement({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        name: req.body.name,
        description: req.body.description
    });

    achievement
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Achievement created',
            createAchievement: {
                _id: result._id,
                productId: result.productId,
                name: result.name,
                description: result.description
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/', (req, res, next) => {
    Achievement.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            achievements: docs.map(doc => {
                return {
                    _id: doc._id,
                    productId: doc.productId,
                    name: doc.name,
                    description: doc.description
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/findByAchievementId/:achievementId', (req, res, next) => {
    const id = req.param.achievementId;

    Achievement.find({ _id: id })
    .exec()
    .then(doc =>  {
        if(doc){
            res.status(200).json({
                achievement: doc
            });
        }else{
            res.status(500).json({
                message: 'Achievement id ' + id + ' does not exist'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.get('/findByProductId/:productId', (req, res, next) => {
    const id = req.params.productId;

    Achievement.find({ productId: id})
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                achievement: doc
            });
        }else{
            res.status(404).json({
                message: 'Product id ' + id + ' does not exist' 
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/delete/:achievementId', (req, res, next) => {
    const id = req.params.achievementId;
    Achievement.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Achievement id ' + id + ' deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;