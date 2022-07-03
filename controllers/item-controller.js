const Workspace = require('../models/Workspace.js');
const Item = require('../models/Item.js');
const History = require('../models/History.js');
const Collaborator = require('../models/Collaborator.js');
const User = require('../models/User.js');

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

	// Only record in the history of workspace when there are changes
	// in the quantity or name of the current item
	if(req.body.property === 'qtyUnit' || req.body.property === 'itemName') {
		// Retrieve the one who deleted the item
		const editor = await User.findById(req.session.user);

		// Record change to the history of current workspace
		const newRecord = new History({
			editorsName: editor.displayName,
			item: item.itemName,
			quantity: parseInt(item.qtyUnit)
		});
		// Save the new record
		await newRecord.save();
		console.log(`=== Update recorded`);

		// Get current Workspace
		const currWorkspace = await Workspace.findById(req.params.workspace);
		// Add the record to the history of the current workspace
		currWorkspace.history.unshift(newRecord._id);
		await currWorkspace.save();
		console.log(`=== Added record to ${currWorkspace.name} (${currWorkspace._id}) history`);
	}

	// Refresh the item page
    res.status(200).redirect('/' + req.params.workspace + '/' + item.pcode);
  } catch (err) {
    // Error encountered
    console.log(err);
    res.status(500).redirect('/' + req.params.workspace + '/' + req.params.pcode);
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

	// Retrieve the one who deleted the item
	const editor = await User.findById(req.session.user);

	// Record change to the history of current workspace
	const delRecord = new History({
		editorsName: editor.displayName,
		item: item.itemName,
		quantity: 0
	});
	await delRecord.save();
	console.log(`=== Update recorded`);

	// Add the record to the history of the current workspace
	currWorkspace.history.unshift(delRecord._id);
	await currWorkspace.save();
	console.log(`=== Added record to ${currWorkspace.name} (${currWorkspace._id}) history`);

	// Redirect to inventory page 
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