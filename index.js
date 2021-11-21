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
    let validity = regex.test(String(mail).toLowerCase())
    let output = {
        "email" : mail,
        "Valid" : validity
    }
    return output
}

app.post("/signup", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    let data = {
        Username: username,
        Password: password,
        email: email,
        date: Date.now()
    }

    let mailValidity = validateEmail(email)
    if(mailValidity.Valid == true) {
        const connectToDB = async () => {
            await mongo().then( async () => {
                try {
                    console.log('Connected to the database')
                    let result1 = await userSchema.findOne({
                        Username: username
                    })
                    let result2 = await userSchema.findOne({
                        email: email
                    })
                    if(!result1 && !result2) {
                        await new userSchema(data).save()
                        console.log('Saved data!')
                        console.log(data)
                    } else if(result1) {
                        let errorMessage = "Username already in use!"
                        throw errorMessage
                    } else if(result2) {
                        let errorMessage = "Email ID already registered!"
                        throw errorMessage
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        }
    } else {
        let errorMessage = "Invalid Email ID provided!"
        throw errorMessage
    }
})
app.get('/', (res, req) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    })
    res.redirect('signup.html')
})
app.listen(6969)
console.log('Listening on PORT 6969')