const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },

    collaborators:{
        type: [mongoose.SchemaTypes.ObjectId]
    },

    history:{
        type: [mongoose.SchemaTypes.ObjectId]
    },

    inventory:{
        type: [mongoose.SchemaTypes.ObjectId]
    }
});

WorkspaceSchema.statics.findOneByName = function(strName) {
    return this.findOne({ name: strName });
};

module.exports = mongoose.model('Workspace', WorkspaceSchema);