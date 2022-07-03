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
  try {
		// Get item
    const item = await Item.findOneByProductCode(req.params.pcode);
    // Apply edits or updates
		// ISSUE: changing itemName doesn't work when pcode is still the same
    item[req.body.property] = req.body[req.body.property];

    console.log(`Item property being updated: ${req.body.property}`);

    // save the changes
    await item.save(); 

    console.log(`Updated item: ${item}`);

    res.status(200).redirect('/' + req.params.workspace + '/' + req.params.pcode);
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
		currWorkspace.inventory.splice(index, 1);

		console.log('===currworkspace inventory spliced===' + currWorkspace.inventory);
		console.log('====item id of item to delete===' + item._id);

    // Delete the item document
		// ISSUE: not deleting in db
    await Item.findByIdAndDelete(item._id);
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