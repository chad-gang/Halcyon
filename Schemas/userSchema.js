const mongoose = require('mongoose')

const reqString = {
    type: String,
    require: true
}

const userSchema = mongoose.Schema({
    Username : reqString,
    Password : reqString,
    email : reqString,
    points : {
        type: Number,
        default: 0,
    },
    date: {
        type: Number,
        required: true
    },
    dailyJournal: [Object]
})

module.exports = mongoose.model('userSchema', userSchema)