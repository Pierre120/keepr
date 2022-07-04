const Workspace = require('../models/Workspace.js');
const Item = require('../models/Item.js');

const getSearchResults = async (req, res) => {
    console.log(`=== Search Query: ${req.query.search}`);
    const workspace = await Workspace.findById(req.params.workspace);
    const searchQuery = {itemName: {$regex: req.query.search, $options: 'i'}}; 
    const searchResults = await Item.find({$and: [searchQuery, {_id: {$in: workspace.inventory}}]});
    
    res.render('search-results', {
        layout: './layouts/results-page',
        searchDisabled: false,
        userId: req.session.user,
        query: req.query.search,
        workspace: workspace._id,
        itemResults: searchResults
    });
}

module.exports = {
    getSearchResults: getSearchResults
}
