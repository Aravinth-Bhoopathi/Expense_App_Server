const mongoose = require('mongoose')
const configureDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/expense-management-app')
        .then((res) => {
            console.log('connect to db')
        })
        .catch((err) => {
            console.log('error connecting to db')
        })
}

module.exports = configureDB