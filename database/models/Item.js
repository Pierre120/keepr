const mongoose = require('mongoose');

// Item schema
const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        unique: true
    },
    pcode: {
        type: String,
        required: true,
        unique: true
    },
    qtyUnit: {
        type: String,
        required: true
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

ItemSchema.statics.findOneByItemName = function(strName) {
    return this.findOne({ itemName: strName });
};

// Export ItemSchema model
module.exports = mongoose.model('Item', ItemSchema);