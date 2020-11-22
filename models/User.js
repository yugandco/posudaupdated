const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    city: String,
    email: String,
    phonenumber: String,
    password: String,
    card: {
        number: Number,
        user: String,
        date: Date,
        cvv: Number,
        added: Date
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User