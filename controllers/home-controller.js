const Workspace = require('../models/Workspace.js');
const Collaborator = require('../models/Collaborator.js');

// For viewing the app/home page
const viewHomePage = async (req,res) =>{
    console.log(`=== Current user: ${req.session.user}`);
    // Get all the workspace of the current user
    const workspaces = await Workspace.find({ owner: req.session.user });
    console.log(`=== Personal Workspaces: ${workspaces}, ${workspaces.length}`);

    const collabs = await Collaborator.find({viewId: req.session.user}).populate('workspace');
    console.log(`=== Collabs info: ${collabs}`);

    for(let work of collabs) {
        workspaces.push(work.workspace);
    }
    console.log(`=== Total Workspaces: ${workspaces}`);
    
    // Render the app/home page
    res.render('home', {
        layout: './layouts/home-page',
        searchDisabled: true,
        hasAddModal: true,
        userId: req.session.user,
        workspaces: workspaces
      });
};

// For adding workspaces
const addWorkspace = async (req,res) => {
    try {
        // Create new workspace
        const newWorkspace = new Workspace({
            name: req.body.workspace,
            owner: req.session.user,
        });

        const isWorkspaceExist = await Workspace.find({ 
            name: newWorkspace.name,
            owner: newWorkspace.owner
        });
        // check if it already exists
        if(isWorkspaceExist.length > 0) {
            console.log(`Workspace already exists for user ${req.session.user}`);
            return res.status(400).redirect('/app');
        }
        // Save the new workspace document
        await newWorkspace.save();
        res.status(200).redirect('/app');
    } catch(err) {
        // Error encountered
        console.log(err);
        res.status(500).redirect('/app'); 
    }
};

module.exports = {
    viewHomePage: viewHomePage,
    addWorkspace: addWorkspace
}