const Workspace = require('../models/Workspace.js');
const Item = require('../models/Item.js');
const History = require('../models/History.js');
const Collaborator = require('../models/Collaborator.js');

// For deleting workspace
const deleteWorkspace = async (req,res) =>{
    const workspace = await Workspace.findById(req.params.workspace);
    try{
        //For deleting all the items in DB included in the workspace
        for(let item of workspace.inventory){
            await Item.findByIdAndDelete(item);
        }
        workspace.inventory = [];
        await workspace.save();
        console.log(`=== Successfully cleared inventory of ${workspace.name} (${workspace._id})`);
        //For deleting all the histories in DB included in the workspace
        for(let history of workspace.history)
        {
            await History.findByIdAndDelete(history);
        }
        workspace.history = [];
        await workspace.save();
        console.log(`=== Successfully cleared history of ${workspace.name} (${workspace._id})`);
        //For deleting all the collaborators in DB included in the workspace
        for(let collab of workspace.collaborators)
        {
            await Collaborator.findByIdAndDelete(collab);
        }
        workspace.collaborators = [];
        await workspace.save();
        console.log(`=== Successfully cleared collaborators of ${workspace.name} (${workspace._id})`);
        // For deleting the current workspace
        await Workspace.findByIdAndDelete(workspace);
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