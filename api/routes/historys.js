const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const History = require('../models/history');
const checkAuth = require('../middleware/check-auth');

router.post('/create', (req, res, next) => {
    const history = new History({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        item: req.body.item,
        quantity: req.body.quantity,
        date: {
            year: req.body.date.year,
            month: req.body.date.month,
            day: req.body.date.day
        }
    });

    history
    .save()
    .then(result => {
        res.status(200).json({
            message: 'Hstory created',
            history: {
                _id: result._id,
                userId: result.userId,
                item: req.body.item,
                quantity: req.body.quantity,
                date: result.date
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
    History.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            history: docs.map(doc => {
                return {
                    _id: doc._id,
                    userId: doc.userId,
                    item: doc.item,
                    quantity: doc.quantity,
                    date: doc.date
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

router.get('/findByItemId/:itemId', (req, res, next) => {
    const id = req.params.itemId;
    
    History.find({ item: id })
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            product: docs.map(doc => {
                return {
                    _id: doc._id,
                    userId: doc.userId,
                    item: doc.product,
                    quantity: doc.quantity,
                    date: doc.date
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/findByUserId/:userId', checkAuth, (req, res, next) => {
    const id = req.params.userId;

    History.find({ userId: id })
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            history: docs.map(doc => {
                return {
                    _id: doc._id,
                    userId: doc.userId,
                    item: doc.item,
                    quantity: doc.quantity,
                    date: doc.date
                };
            })
        };

        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;