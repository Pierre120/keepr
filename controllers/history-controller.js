const History = require('../models/History.js');
const Workspace = require('../models/Workspace.js');

const viewHistoryPage = async(req,res) =>{
    const workspace = await Workspace.findById(req.params.workspace).populate('history');
    // Current user is owner of workspace
    const isOwner = (req.session.user.equals(workspace.owner)) ? true : false;
    console.log('=== Checking content of workspace history ===');
    console.log(workspace.history);

    res.render('history', {
        active: 3,
        layout: './layouts/workspace-page',
        searchDisabled: false,
        isInWorkspace: true,
        deleteType: 'history',
        hasAddModal: false,
        hasEditModal: false,
        hasSortModal: 'history',
        isOwner: isOwner,
        userId: req.session.user,
        workspace: workspace,
        history: workspace.history
      })
};

const clearHistory = async(req,res) => {
    
    try{
        const targetHistory = await Workspace.findById(req.params.workspace);
       // const history_arr = targetHistory.history;
        for(let recordId of targetHistory.history) {
            await History.findByIdAndDelete(recordId);
        }
        targetHistory.history = [];
        await targetHistory.save();
        console.log(`=== Successfully cleared history of ${targetHistory.name} (${targetHistory._id})`);
        res.redirect('/' + req.params.workspace+ '/history');
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
};

const sortHistory = async(req,res) => {
    const workspaceHistory = await Workspace.findById(req.params.workspace);
    const order = req.body.sortHistory;
    let history_sorted;
    try{
        switch(order) {
            case "DESC": // Latest to Oldest
                history_sorted = await History.find({_id: {$in: workspaceHistory.history}})
                                            .sort({editDate: 1}); //Descending order
                break;
            case "ASC": // Oldest to Latest
                history_sorted = await History.find({_id: {$in: workspaceHistory.history}})
                                            .sort({editDate: -1}); //Ascending order
            break;
        }

        // Clear history of workspace
        workspaceHistory.history = [];
        // Reassign sorted history record of current workspace
        for(let record of history_sorted) {
            workspaceHistory.history.push(record._id);
        }
        await workspaceHistory.save();
        console.log(`=== Saved sorted history of ${workspaceHistory.name} (${workspaceHistory._id})`);

        res.redirect('/' + req.params.workspace + '/history');
    }catch(err){
        console.log(err);
        res.redirect('/' + req.params.workspace + '/history');
    }
};

module.exports = {
    viewHistoryPage: viewHistoryPage,
    clearHistory: clearHistory,
    sortHistory: sortHistory
}