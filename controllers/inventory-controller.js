const Workspace = require('../models/Workspace.js');
const Item = require('../models/Item.js');

// For getting the `Inventory` page
const viewInventoryPage = async (req, res) => {
  console.log(req.params);
  // Get current Workspace
  const currWorkspace = await Workspace.findById(req.params.workspace); 
  console.log(req.params.workspace);
  console.log(currWorkspace.name);
  console.log(currWorkspace);
  // Current user is owner of workspace
  const isOwner = (req.session.user.equals(currWorkspace.owner)) ? true : false;
  // Get all the items inside the current workspace
  // const inventoryItems = await Item.find({_id: {$in: currWorkspace.inventory}});
  let inventoryItems = [];
  for(let itemId of currWorkspace.inventory) {
    inventoryItems.push(await Item.findById(itemId));
  }

  console.log(inventoryItems);
  console.log(isOwner);
  console.log(currWorkspace.owner);
  console.log(req.session.user);

  res.status(200).render('inventory', {
    active: 1,
    layout: './layouts/workspace-page',
    isInWorkspace: true,
    deleteType: '',
    hasAddModal: true,
    hasEditModal: false,
    hasSortModal: 'item',
    isOwner: isOwner,
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

  try {
    // Create Item object
    const newItem = new Item({
        itemName: req.body.itemName,
        pcode: req.body.pcode,
        qtyUnit: req.body.qtyUnit,
        description: req.body.description
    });

    // Store newItem
    await newItem.save();

    // Get current Workspace
    const currWorkspace = await Workspace.findById(req.params.workspace);
    // Add the item to workspace
    currWorkspace.inventory.push(newItem._id);
    // Save changes in workspace
    await currWorkspace.save();

    // For checking
    console.log('New item created:');
    console.log(newItem);

    res.status(200).redirect('/' + req.params.workspace + '/inventory');
  } catch(err) {
    // For checking
    console.log(err); 

    res.status(500).redirect('/' + req.params.workspace + '/inventory');
  }
};

// For sorting of inventory
const sortItems = async (req, res) => {

  // Process if items are to be sorted by Name or by Qty 
  // in Ascending or Descending order
  const sortFocus = req.body.sortFocus;
  const sortOrder = req.body.sortOrder;
  // Get current Workspace
  const currWorkspace = await Workspace.findById(req.params.workspace);
  // Generate query to obtain the items in the workspace
  // const inventoryItems = await Item.find({_id: {$in: currWorkspace.inventory}});
  let inventoryItems;
  console.log(sortOrder);

  try {
    if(sortOrder == 'ASC') {
      /*
      await inventoryItems.aggregate(
        {$sort: {sortFocus: 1}}
      );*/
      inventoryItems = await Item.find({_id: {$in: currWorkspace.inventory}})
                                  .sort({itemName: 1});
    }
    else {
      /*
      await currWorkspace.inventory.aggregate(
        {$sort: {sortFocus: -1}}
      );*/
      inventoryItems = await Item.find({_id: {$in: currWorkspace.inventory}})
                                  .sort({itemName: -1});
    }
    console.log(inventoryItems);
    
    // Clear inventory of workspace
    currWorkspace.inventory = [];
    // await currWorkspace.save();
    // Save sorted inventory items in workspace
    for(let item of inventoryItems) {
      currWorkspace.inventory.push(item._id);
    }
    console.log('Workspace for sort: ' + currWorkspace);
    await currWorkspace.save();

    // Redirect back to inventory page
    res.status(200).redirect('/' + req.params.workspace + '/inventory');
    /*res.status(200).render('inventory', {
      active: 1,
      layout: './layouts/workspace-page',
      isInWorkspace: true,
      deleteType: '',
      hasAddModal: true,
      hasEditModal: false,
      hasSortModal: 'item',
      isOwner: isOwner,
      // TODO: Pass the `Workspace` object of the current user retrieved from mongodb
      workspace: currWorkspace,
      // TODO: Pass the array of `Item` objects
      // NOTE: Make the current workspace's Item's `assignedCollabs` property array into an object array.
      //      Since this properties contains only the ObjectId and it will not render itself in the frontend.
      inventoryItems: inventoryItems
    });*/
  } catch(err) {
    // For checking
    console.log(err); 

    res.status(500).redirect('/' + req.params.workspace + '/inventory');
  }
};

module.exports = {
    viewInventoryPage: viewInventoryPage,
    addItem: addItem,
    sortItems: sortItems
}