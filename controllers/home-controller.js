const Workspace = require('../models/Workspace.js');
const Collaborator = require('../models/Collaborator.js');
const User = require('../models/User.js')

// For viewing the app/home page
const viewHomePage = async (req,res) =>{
    // Get user record of current user
    const currUser = await User.findById(req.session.user);
    // Get all the personal workspace of the current user
    let workspaces = await Workspace.find({owner: currUser._id});
    // Find all the collabs of the current user
    const collabs = await Collaborator.find({displayName: currUser.displayName});
    const collabWorkspaces = [];

    // Find all the workspace collabs of the current user
    for(let work of collabs) {
        collabWorkspaces.push(await Workspace.findById(work.workspace));
    }

    // Store all the personal and collab workspaces of the current user
    workspaces = workspaces.concat(collabWorkspaces);  //appends the collab works with the user's owned workspaces
    
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