const Workspace = require('../models/Workspace.js');

const viewHomePage = async (req,res) =>{
    res.render('home', {layout: './layouts/home-page' });
};

const addWorkspace = async (req,res) => {
    
};

module.exports = {
    viewHomePage: viewHomePage,
    addWorkspace: addWorkspace
}