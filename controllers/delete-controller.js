const Workspace = require('../models/Workspace.js');

const deleteWorkspace = async (req,res) =>{
    var deleteWorkspace = req.body.workspace;
    Workspace.findOneAndDelete(deleteWorkspace);
    res.send({isErr:0, content:'/app'});
};

module.exports ={
    deleteWorkspace: deleteWorkspace
}