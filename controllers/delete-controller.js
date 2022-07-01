const Workspace = require('../models/Workspace.js');

const deleteWorkspace = async (req,res) =>{
    var workspace = req.body.property;
    Workspace.findByIdAndDelete(workspace);
    res.send({isErr:0, content:'/'});
};

module.exports ={
    deleteWorkspace: deleteWorkspace
}