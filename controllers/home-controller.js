const Workspace = require('../models/Workspace.js');

const viewHomePage = async (req,res) =>{
    const workspaces = await Workspace.find({ owner: req.session.user });
    console.log(workspaces);
    res.render('home', {
        layout: './layouts/home-page',
        hasAddModal: true,
        workspaces: workspaces
      });
};

const addWorkspace = async (req,res) => {
    try {
        const newWorkspace = new Workspace({
            name: req.body.workspace,
            owner: req.session.user,
        });
        await newWorkspace.save();
        res.status(200).redirect('/app');
    } catch(err) {
        console.log(err);
        res.status(500).redirect('/app'); 
    }
};

module.exports = {
    viewHomePage: viewHomePage,
    addWorkspace: addWorkspace
}