const mongoose = require('mongoose');
const User = require('./User');

const WorkspaceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    owner:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },

    collaborators:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Collaborator"
    },

    history:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "History"
    },

    inventory:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Item"
    }
});

WorkspaceSchema.statics.findOneByName = function(strName) {
    return this.findOne({ name: strName });
};

module.exports = mongoose.model('Workspace', WorkspaceSchema);