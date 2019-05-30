const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product DLC', required: true },
    quantity: { type: Number, default: 1 },
    type: { type: String, required: true }
});

module.exports = mongoose.model("Stock", stockSchema);