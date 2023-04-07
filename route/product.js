const express = require("express")
const router = express.Router()
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const {fetchProduct, storeProduct, updateProduct} = require("../controller/product")
const {checkAuthentication, isSeller} = require("../middleware/checkAuthentication")
const validateSchema = require("../middleware/validateSchema")

// const storeProductSchema = Joi.object({
//     name: Joi.string()
//     .required(),
//     created_by : Joi.objectId()
//     .required()
// })



router.get("/products",fetchProduct)
router.post("/products", checkAuthentication, isSeller,storeProduct)
router.put("/products/:id", checkAuthentication, isSeller, updateProduct)


module.exports = router