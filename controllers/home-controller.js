const Workspace = require('../models/Workspace.js');

// For viewing the app/home page
const viewHomePage = async (req,res) =>{
    // Get all the workspace of the current user
    const workspaces = await Workspace.find({ owner: req.session.user });
    
    // Render the app/home page
    res.render('home', {
        layout: './layouts/home-page',
        hasAddModal: true,
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