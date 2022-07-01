const Workspace = require('../models/Workspace.js');

const deleteWorkspace = async (req,res) =>{
    try{
        await Workspace.findByIdAndDelete(req.params.workspace);
        res.redirect('/app');
    }catch(err){
        res.redirect('back');
        console.log(err);
    }

};

module.exports ={
    deleteWorkspace: deleteWorkspace
}