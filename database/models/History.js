const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    editDate:{
        type: Date,
        required: true,
        default: ()=> Date.now()
    },

    editorsName:{
        type: String,
        required: true,
    },

    item:{
        type: String,
        required: true
    },

    quantity:{
        type: Number,
        required:true,
        min: 1
    }


});


module.exports('History', HistorySchema);