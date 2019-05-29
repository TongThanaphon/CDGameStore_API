const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Map, of: String},
    dlc: { type: Map, of: String },
    date: { type: Map, of: String }
});

module.exports = mongoose.model('History', historySchema);