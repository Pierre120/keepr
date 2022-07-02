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
        ref: "Collaborators"
    },

    history:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "History"
    },

    inventory:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Inventory"
    },

    referenceId:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        unique: true
    }
});

WorkspaceSchema.statics.findOneByName = function(strName) {
    return this.findOne({ name: strName });
};

WorkspaceSchema.statics.findOneByID = function(id) {
    return this.findOne({ referenceId: id });
};

module.exports = mongoose.model('Workspace', WorkspaceSchema);