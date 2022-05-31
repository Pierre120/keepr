const mongoose = require('mongoose');
const User = require('./User');

// Item schema
const ItemSchema = new mongoose.Schema({
    pcode: {
        type: String,
        required: true,
        unique: true
    },
    qtyUnit: {
        type: String
    },
    description: {
        type: String
    },
    assignedCollabs: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'User'
    }
});

// Static method
ItemSchema.statics.findOneByProductCode = function(strCode) {
    return this.findOne({ pcode: strCode });
};

// Export ItemSchema model
module.exports = mongoose.model('Item', ItemSchema);