const Workspace = require('../models/Workspace.js');

const viewHomePage = async (req,res) =>{
    res.render('home', {layout: './layouts/home-page' });
};

const addWorkspace = async (req,res) => {
    try{
        const newWorkspace = new Workspace({
            name: req.body.workspace,
            owner: req.session.user,
        });
        await user.save();
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