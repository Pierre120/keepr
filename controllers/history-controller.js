const History = require('../database/models/History.js');

const viewHistoryPage = async(req,res) =>{
    res.render('history', {layout: './layouts/workspace-page'});
};

const clearHistory = async(req,res) => {

};

const sortHistory = async(req,res) => {

};

module.exports = {
    viewHistoryPage: viewHistoryPage,
    clearHistory: clearHistory,
    sortHistory: sortHistory
}