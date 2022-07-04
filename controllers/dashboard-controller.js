const Workspace = require('../models/Workspace.js');
const Item = require('../models/Item.js');
const History = require('../models/History.js');

const viewDashboardPage = async (req,res) =>{
    const workspace = await Workspace.findById(req.params.workspace);

    // determine if the owner is viewing his/her account page
    const isOwner = (req.session.user.equals(workspace.owner)) ? true : false;

    const updates = await generateUpdates(workspace.history);
    const lowStock = await lowOnStock(workspace.inventory);
    const topItem = await getTopItem(workspace.history);

    console.log(`=== in workspace: ${workspace}`);
    res.render('dashboard', {
        active: 0,
        layout: './layouts/workspace-page',
        searchDisabled: false,
        isInWorkspace: true,
        deleteType: '',
        hasAddModal: false,
        hasEditModal: false, 
        hasSortModal: false,
        isOwner: isOwner,
        userId: req.session.user,
        workspace: workspace,
        updates: updates,
        lowStock: lowStock,
        topItem: topItem,
        totalItems: workspace.inventory.length,
        totalCollaborators: workspace.collaborators.length
    });
};

const generateUpdates = async (history) => {
    const histRecords = await History.find({_id: {$in: history}})
                                            .sort({editDate: -1});
    const length = histRecords.length;
    const updates = [];
    let updateObj;
    let isNew;

    for(let x = 0; x < length; ++x) {
        isNew = true;
        for(let y = x+1; y < length; ++y) {
            console.log(`Comparing ${histRecords[x]._id} and ${histRecords[y]._id}`);
            // Find 2 most recent update of each record from latest to oldest
            if(histRecords[x].item === histRecords[y].item) {
                isNew = false;
                updateObj = {
                    date: histRecords[x].datetime2,
                    user: histRecords[x].editorsName,
                    item: histRecords[x].item
                }

                // Check if is increment or decrement
                if(histRecords[x].quantity - histRecords[y].quantity > 0) {
                    updateObj.action = 'incremented';
                } else {
                    updateObj.action = 'decremented';
                }
                // Add to array of updates
                updates.push(updateObj);
                console.log(`Successfully added update: ${updateObj}`);
                break;
            }
        }

        if(isNew) {
            updateObj = {
                date: histRecords[x].datetime2,
                user: histRecords[x].editorsName,
                item: histRecords[x].item,
                action: 'added'
            };
            // Add to array of updates
            updates.push(updateObj);
            console.log(`Successfully added update: ${updateObj}`);
        }
    }

    return updates;
}

//this searches for the items that have less than 5 qtyUnits
const lowOnStock = async (inventory) => {
    const lowStockItems = await Item.find({_id: {$in: inventory}, qtyUnit: {$lt:6}});
    console.log(`=== low on stock items: ${lowStockItems[0]}`);
    console.log(`${lowStockItems.length}`);
    return lowStockItems;
}

const getTopItem = async (history) => {
    //sort all the items within the History in Ascending order
    const itemsRecord = await History.find({_id: {$in: history}}).sort({item: 1});
    let total = 0;
    let summedObj = []; // [{item:, total:}]

    // Getting total decrement
    for(let i = 1; i < itemsRecord.length; ++i) 
    {
        if(itemsRecord[i-1].item !== itemsRecord[i].item && total < 0) {
            let sumObj = {
                item: itemsRecord[i-1].item,
                totalDec: total
            };
            summedObj.push(sumObj);
            total = 0;
            continue;
        }
        total += itemsRecord[i-1].quantity - itemsRecord[i].quantity;
    }

    if(summedObj.length === 0) return 'N/A';

    // Find minimum totalDec
    let topItem = summedObj[0];
    for(let j = 1; j < summedObj.length; ++j){
        if(summedObj[j].totalDec < topItem.totalDec) {
            topItem = summedObj;
        }
    }
    return topItem.item;
}


module.exports ={
    viewDashboardPage: viewDashboardPage
}