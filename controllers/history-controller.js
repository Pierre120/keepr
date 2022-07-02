const History = require('../database/models/History.js');
const Workspace = require('../database/models/Workspace.js');

const viewHistoryPage = async(req,res) =>{
    res.render('history', {layout: './layouts/workspace-page'});
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
            case "DESC": history_sorted = await History.find({_id: {$in: targetHistory.history}}).sort({editDate: -1}); //descending order
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