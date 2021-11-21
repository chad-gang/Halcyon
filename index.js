require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userSchema = require('./Schemas/userSchema')
const mongo = require('./mongo')
const app = express();

app.use(bodyParser.json())
app.use(express.static('.'))
app.use(bodyParser.urlencoded({
    extended: true
}))

function validateEmail(mail) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validity = re.test(String(mail).toLowerCase())
    let output = {
        "email" : mail,
        "Valid" : validity
    }
    return output
}

app.listen(6969)
console.log('Listening on PORT 6969')