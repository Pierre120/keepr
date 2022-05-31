const mongoose = require('mongoose');

// Collaborator schema
const CollaboratorSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    workspace: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Workspace'
    },
    assignedItems: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Item'
    }
});

// Static method
CollaboratorSchema.statics.findOneByDisplayName = function(strName) {
    return this.findOne({ displayName: strName });
};

// Export CollaboratorSchema model
module.exports = mongoose.model('Collaborator', CollaboratorSchema);