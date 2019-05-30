const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Product DLC' },
    quantity: { type: Number },
    date: { type: Map, of: Number }
});

module.exports = mongoose.model('History', historySchema);