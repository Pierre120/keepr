const Workspace = require('../models/Workspace.js');
const Item = require('../models/Item.js');

// For getting the Item page
const viewItemPage = async (req, res) => {
	// Get current Workspace
	const currWorkspace = await Workspace.findById(req.params.workspace);

	// Determine if the current user is the owner of the current workspace an item belongs to
	const isOwner = (req.session.user.equals(currWorkspace.owner)) ? true : false;

	// Get item
	const item = await Item.findOneByProductCode(req.params.pcode);

	// Render the account page of the user being viewed
	res.status(200).render('item', {
		layout: './layouts/item-page',
		isInWorkspace: false,
		deleteType: 'item',
		hasEditModal: true,
		isOwner: isOwner,
		item: item
	})
};

const updateItemInfo = async (req, res) => {
	// Get item
	const item = await Item.findOneByProductCode(req.params.pcode);
  try {
		console.log(`=== Item being modified:  ${item._id} (${item.itemName})`)
    // Apply edits or updates
    item[req.body.property] = req.body[req.body.property];
    console.log(`=== Item property being updated: ${req.body.property}`);

    // save the changes
    await item.save(); 
    console.log(`=== Updated item: ${item}`);
		// Refresh the item page
    res.status(200).redirect('/' + req.params.workspace + '/' + item.pcode);
  } catch (err) {
    // Error encountered
    console.log(err);
    res.status(500).redirect('/' + req.params.workspace + '/' + item.pcode);
  }
}

const deleteItem = async (req, res) => {
  try {
		// Get current Workspace
		const currWorkspace = await Workspace.findById(req.params.workspace);
		// Get item
		const item = await Item.findOneByProductCode(req.params.pcode);
		// Delete from Inventory in current Workspace
		const index = currWorkspace.inventory.indexOf(item._id);
		console.log(`=== Item to be deleted:  ${item._id} (${item.itemName})`);
		// Delete item in workspace inventory
		currWorkspace.inventory.splice(index, 1);
		await currWorkspace.save(); // Save changes in `currWorkspace`
		console.log(`=== Item, ${item._id} (${item.itemName}) removed`);
		console.log(`=== from workspace, ${currWorkspace.name} (${currWorkspace._id})`);

    // Delete the item document
    await Item.findByIdAndDelete(item._id);
		console.log(`=== Deleted item:  ${item._id} (${item.itemName})`)
		// Redirect to inventory page (tentative)
		res.status(200).redirect('/' + req.params.workspace + '/inventory');
	} catch (err) {
    // Error encountered
    console.log(err);
    res.status(500).redirect('/' + req.params.workspace + '/inventory');
  }
}

module.exports = {
	viewItemPage: viewItemPage,
	updateItemInfo: updateItemInfo,
  deleteItem: deleteItem
}