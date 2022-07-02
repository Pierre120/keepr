const Workspace = require('../models/Workspace.js');

// For deleting workspace
const deleteWorkspace = async (req,res) =>{
    try{
        // For deleting the current workspace
        await Workspace.findByIdAndDelete(req.params.workspace);
        console.log(`Deleted workspace: ${req.params.workspace}`);
        res.status(200).redirect('/app');
    }catch(err){
        // Error encountered
        console.log(err);
        res.status(500).redirect('/' + req.params.workspace + '/dashboard');
    }

};

module.exports ={
    deleteWorkspace: deleteWorkspace
}