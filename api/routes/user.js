const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length >= 1){
            res.status(409).json({
                message: 'Mail exist'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: {
                            first_name: req.body.name.first_name,
                            last_name: req.body.name.last_name,
                        },
                        age: req.body.age,
                        email: req.body.email,
                        password: hash,
                        address: req.body.address
                    });
        
                    user
                    .save()
                    .then(result => {
                        res.status(201).json({
                        message: 'User created',
                        user: {
                            _id: result._id,
                            name: result.name,
                            age: result.age,
                            email: result.email,
                            password: result.password,
                            address: result.address,
                            point: result.point,
                            history: result.history
                        }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result){
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/details/:userId', checkAuth, (req, res, next) => {
    const id = req.params.userId;
    User.find({ _id: id })
    .exec()
    .then(user => {
        res.status(200).json({
            user: user
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/update/:userId', checkAuth, (req, res, next) => {
    const id  = req.params.userId;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User updated'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/guest', (req, res, next) => {
    const guest = process.env.GUEST_ID;

    User.find({ _id: guest })
    .exec()
    .then(guest => {
        res.status(200).json({
            guest: guest
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.patch('/updateguest', (req, res, next) => {
    const guest = process.env.GUEST_ID;

    User.update({ _id: guest }, { $set: { history: req.body.history } })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Guest user updated'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/delete/:userId', (req, res, next) => {
    const id = req.params.userId;

    User.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
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