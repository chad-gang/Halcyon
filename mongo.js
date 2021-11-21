const mongoose = require('mongoose')
require('dotenv').config()

const path = process.env.mongoURI

module.exports = async () => {
    await mongoose.connect(path, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(async e => {
        await console.log('Connected to database!')
    })
    return mongoose
}