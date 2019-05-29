const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const DLC = require('../models/dlc');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/dlcs');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req ,file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    } 
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/create', upload.single('dlcImage'), (req, res, next) => {
    const dlc = new DLC({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        releaseDate: req.body.releaseDate,
        size: req.body.size,
        dlcImage: req.file.path
    });

    dlc
    .save()
    .then(result => {
        res.status(201).json({
            message: 'DLC created',
            createDLC: {
                _id: result._id,
                productId: result.productId,
                name: result.name,
                description: result.description,
                price: result.price,
                releaseDate: result.releaseDate,
                size: result.size,
                dlcImage: result.dlcImage
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
    DLC.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            dlcs: docs.map(doc => {
                return {
                    _id: doc._id,
                    productId: doc.productId,
                    name: doc.name,
                    description: doc.description,
                    price: doc.price,
                    releaseDate: doc.releaseDate,
                    size: doc.size,
                    dlcImage: doc.dlcImage
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/findByDLCId/:dlcId', (req, res, next) => {
    const id = req.params.dlcId;

    DLC.find({ _id: id })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                dlc: doc
            });
        }else{
            res.status(404).json({
                message: 'DLC id ' + id + ' does not exist'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/findByProductId/:productId', (req, res, next) => {
    const id = req.params.productId;

    DLC.find({ productId: id })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                dlc: doc
            });
        }else{
            res.status(500).json({
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

router.patch('/update/:dlcId', (req, res, next) => {
    const id = req.params.dlcId;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    DLC.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'DLC id ' + id + ' updated'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/delete/:dlcId', (req, res, next) => {
    const id = req.params.dlcId;
    DLC.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'DLC id ' + id + ' deleted'
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