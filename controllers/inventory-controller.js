const Workspace = require('../models/Workspace.js');
const Item = require('../models/Item.js');

// For creating new item
const addItem = async (req, res) => {

    // Create Item object
    const newItem = new Item({
        itemName: req.body.itemName,
        pcode: req.body.pcode,
        qtyUnit: req.body.qtyUnit,
        description: req.body.description,
        assignedCollabs: req.body.assignedCollabs
    });

    try {
        await newItem.save();
        console.log('New item created:');
        console.log(newItem);
        // New item created successfully
        res.redirect('/:workspace/inventory'); 
    } catch(err) {
        console.log(err);
    }
};

// For sorting of inventory
const sortItems = async (req, res) => {

    // Process if items are to be sorted by Name or by Qty 
    // in Ascending or Descending order
    const sortFocus = req.body.sortFocus;
    const sortOrder = req.body.sortOrder;

    try {
        if(sortOrder == 'ASC') {
            //await Workspace..find( { $query: {}, $orderby: { sortFocus : -1 } } );
        }
        else {
            //await Workspace..find( { $query: {}, $orderby: { sortFocus : -1 } } );
        }
        res.redirect('/:workspace/inventory'); 
    } catch(err) {
        console.log(err);
    }
};

module.exports = {
    addItem: addItem,
    sortItems: sortItems
}