const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPraser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const dlcRoutes = require('./api/routes/dlcs');
const achievementRoutes = require('./api/routes/achievements');
const stockRoutes = require('./api/routes/stocks');
const userRoutes = require('./api/routes/user');
const historyRoutes = require('./api/routes/historys');
const cartRoutes = require('./api/routes/carts');

mongoose.connect('mongodb+srv://adminske:' + process.env.MONGO_ATLAS_PW 
+ '@cd-game-store-fmvqj.mongodb.net/test?retryWrites=true',
{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyPraser.urlencoded({ extended: false }));
app.use(bodyPraser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if(req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods", 
        "PUT, POST, GET, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/dlcs', dlcRoutes);
app.use('/achievements', achievementRoutes);
app.use('/stocks', stockRoutes);
app.use('/users', userRoutes);
app.use('/historys', historyRoutes);
app.use('/carts', cartRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;