const Expense = require('../models/expense')

const expensesController = {}

expensesController.create =(req, res) => {
    const {title, amount, expenseDate, category} = req.body
    const user = req.tokenData._id
    const data = {title, amount, expenseDate, category, user}
    const expense = new Expense(data)
    expense.save()
        .then((expense) => {
            Expense.findOne({_id: expense._id}).populate('category')
                .then((expense) => {
                    res.json(expense)
                })
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.list = (req, res) => {
    const user = req.tokenData._id
    Expense.find({user}).populate('category')
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.update = (req, res) => {
    const body = req.body
    const id = req.params.id 
    const user = req.tokenData._id 
    const action = req.query.action 
    if(action === 'delete'){
        Expense.findOneAndUpdate({_id: id, user}, {isDeleted: true}, {new: true}).populate('category')
            .then((expense) => {
                res.json(expense)
            })
            .catch((err) => {
                res.json(err)
            })
    } else if(action === 'restore'){
        Expense.findOneAndUpdate({_id: id, user}, {isDeleted: false}, {new: true}).populate('category')
            .then((expense) => {
                res.json(expense)
            })
            .catch((err) => {
                res.json(err)
            })
    } else if(action === 'update'){
        Expense.findOneAndUpdate({_id: id, user}, body, {new: true}).populate('category')
            .then((expense) => {
                res.json(expense)
            })
            .catch((err) => {
                res.json(err)
            })
    }

}

module.exports = expensesController