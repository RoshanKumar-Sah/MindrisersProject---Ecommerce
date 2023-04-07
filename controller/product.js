const Product = require("../model/Product")


const fetchProduct = async (req, res, next) => {
    let products = await Product.find()
    res.send({ "data": products })
}

const storeProduct = async (req, res, next) => {
    try {
        let product = await Product.create({ ...req.body, created_by: req.user._id })
        res.send(product)
    } catch (err) {
        next(err)
    }
}

const updateProduct = async (req, res, next) => {

    // console.log(req.params.id);
    /* check if the product belong to same seller or not*/

    let to_be_updated = await Product.findById(req.params.id)

    if (req.user._id == to_be_updated.created_by) {
        let updated_product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }) //used new to show updated product instantly
        res.send(updated_product)
        // res.send("Product Updated")
    } else {
        return res.status(403).send({ msg: "access denied - not your product" })
    }



}


module.exports = {
    fetchProduct,
    storeProduct,
    updateProduct
}