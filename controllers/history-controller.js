const History = require('../database/models/History.js');
const Workspace = require('../database/models/Workspace.js');

const viewHistoryPage = async(req,res) =>{
    const workspace = await Workspace.findById(req.params.workspace);
    const history = workspace.history;
    let histor_arr = [];
    for(var i=0; i<history.length; i++)
    {
        history_arr[i] = await History.findById(history[i]);
    }
    res.render('history', {
        active: 3,
        layout: './layouts/workspace-page',
        isInWorkspace: true,
        deleteType: 'history',
        hasAddModal: false,
        hasEditModal: false,
        hasSortModal: 'history',
        // TODO: Pass the `Workspace` object of the current user retrieved from mongodb
        workspace: workspace,
        // TODO: Pass the array of history records of the current workspace.
        // NOTE: Make the Workspace's `history` property array into an object array.
        //      Since this properties contains only the ObjectId and it will not render itself in the frontend.
         history: history_arr
    
      })
};

const clearHistory = async(req,res) => {
    try{
        const targetHistory = await Workspace.findById(req.params.workspace);
        const history_arr = targetHistory.history;
        for(var i=0; i<history_arr.length; i++)
        {
            await History.findByIdAndDelete(history_arr[i]);
        }
        targetHistory.history = [];
        await targetHistory.save();
        res.redirect('/:workspace/history');
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
};

const sortHistory = async(req,res) => {
    const targetHistory = await Workspace.findById(req.params.workspace);
    const history_arr = targetHistory.history;
    const order = req.body.sortHistory;
    let history_sorted;
    try{
        switch(order){
            
            case "ASC": 
                history_sorted = await History.find({_id: {$in: targetHistory.history}})
                                            .sort({editDate: 1}); //ascending order
                break;
            case "DESC": 
                history_sorted = await History.find({_id: {$in: targetHistory.history}})
                                            .sort({editDate: -1}); //descending order
            break;
        }
        res.redirect('/:workspace/history');
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
};

module.exports = {
    viewHistoryPage: viewHistoryPage,
    clearHistory: clearHistory,
    sortHistory: sortHistory
}