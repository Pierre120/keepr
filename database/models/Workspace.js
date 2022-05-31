const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
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
    }
});

UserSchema.statics.findOneByName = function(strName) {
    return this.findOne({ name: strName });
};

module.exports('Workspace', WorkspaceSchema);