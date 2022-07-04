const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    editDate:{
        type: Date,
        required: true,
        default: ()=> Date.now()
    },

    editorsName:{
        type: String,
        required: true
    },

    item:{
        type: String,
        required: true
    },

    quantity:{
        type: Number,
        required:true,
        min: 0
    }


});

//virtual schema to format the date time
HistorySchema.virtual('datetime1').get(function() {
    const months = [
        "January ", "February ", "March ", "April ", "May ", "June ", 
        "July ", "August ", "September ", "October ", "November ", "December "
    ];
    const date = months[this.editDate.getMonth()] + this.editDate.getDate() + ', ' + this.editDate.getFullYear();
    const time = this.editDate.getHours() + ':' + this.editDate.getMinutes() + ':' + this.editDate.getSeconds();
    return date + '<br>'  + time;
});

HistorySchema.virtual('datetime2').get(function() {
    const months = [
        "January ", "February ", "March ", "April ", "May ", "June ", 
        "July ", "August ", "September ", "October ", "November ", "December "
    ];
    const date = months[this.editDate.getMonth()] + this.editDate.getDate() + ', ' + this.editDate.getFullYear();
    const time = this.editDate.getHours() + ':' + this.editDate.getMinutes() + ':' + this.editDate.getSeconds();
    return date + ' ['  + time + ']';
});

module.exports = mongoose.model('History', HistorySchema);