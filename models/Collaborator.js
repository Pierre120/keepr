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
    }, 
    viewId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
});

// Static method
CollaboratorSchema.statics.findOneByDisplayName = function(strName) {
    return this.findOne({ displayName: strName });
};

CollaboratorSchema.statics.findOneByViewId = function(id) {
    return this.findOne({ viewId: id });
};

// Export CollaboratorSchema model
module.exports = mongoose.model('Collaborator', CollaboratorSchema);
