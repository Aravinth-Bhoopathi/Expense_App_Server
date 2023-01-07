const mongoose = require('mongoose')

const Schema = mongoose.Schema
const expenseSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    expenseDate : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    category : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "Category"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense