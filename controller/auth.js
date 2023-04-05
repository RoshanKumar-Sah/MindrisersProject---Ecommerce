const Joi = require('joi');
const express = require("express")
const app = express()
const User = require("../model/User")


app.use(express.json())

const schema = Joi.object({
    name: Joi.string()
       
        .max(255)
        .required()
    })

const signup = async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body,{abortEarly: false});
    }
    catch (err) {
        res.send(err)
     }
return;
    try {
        let user = await User.create(req.body)
        res.send(user)
    } catch (err) {
        next(err)
    }

}

module.exports = {
    signup
}