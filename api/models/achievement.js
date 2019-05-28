const mongoose = require('mongoose');

const AchievementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
    name: { type: String, required: true },
    description: { type: String, require: true }
});

module.exports = mongoose.model("Achievement", AchievementSchema);