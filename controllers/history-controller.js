const History = require('../database/models/History.js');
const Workspace = require('../database/models/Workspace.js');

const viewHistoryPage = async(req,res) =>{
    res.render('history', {layout: './layouts/workspace-page'});
};

const clearHistory = async(req,res) => {
    try{
        var targetHistory = await Workspace.findById(req.body.workspace);
        var history_arr = targetHistory.history;
        for(var i=0; i<history_arr.length; i++)
        {
            History.findByIdAndDelete(history_arr[i]);
        }
        res.redirect('/app');
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
};

const sortHistory = async(req,res) => {

};

module.exports = {
    viewHistoryPage: viewHistoryPage,
    clearHistory: clearHistory,
    sortHistory: sortHistory
}