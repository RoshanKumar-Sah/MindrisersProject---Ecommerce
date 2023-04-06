const express = require("express")
const router = express.Router()
const Joi = require("joi")
const {signup, login} = require("../controller/auth")
const validateSchema = require("../middleware/validateSchema")

const signupSchema = Joi.object({
    name: Joi.string()

        .max(255)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required(),

    role: Joi.string()
        .required()
}
)

const loginSchema = Joi.object({
  
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
}
)

router.post("/signup",validateSchema(signupSchema), signup)
router.post("/login",validateSchema(loginSchema), login)


module.exports = router