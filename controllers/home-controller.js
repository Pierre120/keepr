const Workspace = require('../models/Workspace.js');

const viewHomePage = async (req,res) =>{
    const workspace = Workspace.findById(req.params.workspace);
    res.render('home', {
        layout: './layouts/home-page',
        hasAddModal: true,
        workspace: workspace,
      });
};

const addWorkspace = async (req,res) => {
    try{
        const newWorkspace = new Workspace({
            name: req.body.workspace,
            owner: req.session.user,
        });
        await newWorkspace.save();
        res.redirect('/app');
    }catch(err)
    {
        console.log(err);
        res.redirect('back');
    }
};

module.exports = {
    viewHomePage: viewHomePage,
    addWorkspace: addWorkspace
}