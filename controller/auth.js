const Joi = require('joi');
const express = require("express")
const app = express()
const bcrypt = require('bcrypt');
const User = require("../model/User")


app.use(express.json())



const signup = async (req, res, next) => {

    try {

        let hashed_pw = await bcrypt.hash(req.body.password, 10);

        let user = await User.create({...req.body, password: hashed_pw})
        res.send(user)
    } catch (err) {
        next(err)
    }

}



const login = async (req,res,next)=>{

   // check email
   // check password

   let user = await User.findOne({email : req.body.email})
   if(user){
    let status = await bcrypt.compare(req.body.password, user.password);
    if(status){
        let obj = {...user.toObject()}
        delete obj.password
       return res.send({"data": obj})
    }
   }
  
    return res.status(401).send({msg:"unauthenticated"})
}

module.exports = {
    signup,
    login
}