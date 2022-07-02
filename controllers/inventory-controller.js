const Workspace = require('../models/Workspace.js');
const Item = require('../models/Item.js');

// For getting the `Inventory` page
const viewInventoryPage = async (req, res) => {
    // Get current Workspace
    const currWorkspace = Workspace.findOneById(req.params.workspace.referenceId);
    // Get array of Item objects with new Item
    const inventoryItems = Item.find({_id: {$in: currWorkspace.inventory}});

    res.status(200).render('inventory', {
        active: 1,
        layout: './layouts/workspace-page',
        isInWorkspace: true,
        deleteType: '',
        hasAddModal: true,
        hasEditModal: false,
        hasSortModal: 'item',
        // TODO: Pass the `Workspace` object of the current user retrieved from mongodb
        workspace: currWorkspace,
        // TODO: Pass the array of `Item` objects
        // NOTE: Make the current workspace's Item's `assignedCollabs` property array into an object array.
        //      Since this properties contains only the ObjectId and it will not render itself in the frontend.
        inventoryItems: inventoryItems
    });
};

// For creating new item
const addItem = async (req, res) => {
    
    // Get current Workspace
    const currWorkspace = Workspace.findOneById(req.params.workspace.referenceId);
    // Current user is owner of workspace
    const isOwner = (req.session.user.equals(currWorkspace.owner)) ? true : false;;

    if(!isOwner) {
        // Retrieve original array of Item objects
        const inventoryItems = Item.find({_id: {$in: currWorkspace.inventory}});

        // Display new item
        return res.status(400).render('inventory', {
            active: 1,
            layout: './layouts/workspace-page',
            isInWorkspace: true,
            deleteType: '',
            hasAddModal: true,
            hasEditModal: false,
            hasSortModal: 'item',
            // TODO: Pass the `Workspace` object of the current user retrieved from mongodb
            workspace: currWorkspace,
            // TODO: Pass the array of `Item` objects
            // NOTE: Make the current workspace's Item's `assignedCollabs` property array into an object array.
            //      Since this properties contains only the ObjectId and it will not render itself in the frontend.
            inventoryItems: inventoryItems
        });
    }

    // Create Item object
    const newItem = new Item({
        itemName: req.body.itemName,
        pcode: req.body.pcode,
        qtyUnit: req.body.qtyUnit,
        description: req.body.description,
        assignedCollabs: req.body.assignedCollabs
    });

    try {
        // Store newItem
        await newItem.save();

        // For checking
        console.log('New item created:');
        console.log(newItem);

        // Get array of Item objects with new Item
        const inventoryItems = Item.find({_id: {$in: currWorkspace.inventory}});

        // Display new item
        res.status(200).render('inventory', {
            active: 1,
            layout: './layouts/workspace-page',
            isInWorkspace: true,
            deleteType: '',
            hasAddModal: true,
            hasEditModal: false,
            hasSortModal: 'item',
            // TODO: Pass the `Workspace` object of the current user retrieved from mongodb
            workspace: currWorkspace,
            // TODO: Pass the array of `Item` objects
            // NOTE: Make the current workspace's Item's `assignedCollabs` property array into an object array.
            //      Since this properties contains only the ObjectId and it will not render itself in the frontend.
            inventoryItems: inventoryItems
        });
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
    // Get current Workspace
    const currWorkspace = Workspace.findOneById(req.params.workspace.referenceId);
    // Get array of Item objects
    const inventoryItems = Item.find({_id: {$in: currWorkspace.inventory}});

    try {
        if(sortOrder == 'ASC') {
            await currWorkspace.aggregate(
                {$sort: {sortFocus: 1}}
            );
        }
        else {
            await currWorkspace.aggregate(
                {$sort: {sortFocus: -1}}
            );
        }

        // Display sorted Inventory
        res.status(200).render('inventory', {
            active: 1,
            layout: './layouts/workspace-page',
            isInWorkspace: true,
            deleteType: '',
            hasAddModal: true,
            hasEditModal: false,
            hasSortModal: 'item',
            // TODO: Pass the `Workspace` object of the current user retrieved from mongodb
            workspace: currWorkspace,
            // TODO: Pass the array of `Item` objects
            // NOTE: Make the current workspace's Item's `assignedCollabs` property array into an object array.
            //      Since this properties contains only the ObjectId and it will not render itself in the frontend.
            inventoryItems: inventoryItems
        });
    } catch(err) {
        console.log(err);
    }
};

module.exports = {
    viewInventoryPage: viewInventoryPage,
    addItem: addItem,
    sortItems: sortItems
}