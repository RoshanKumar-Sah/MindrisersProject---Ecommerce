const mongoose = require("mongoose")
const { SELLER, BUYER } = require("../constant/role")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    description: {
        type: String
    },
    images:{
        type:[String] //store path of our images
    },
    categories:{
        type: String
    },
    brands:{
        type: String
    },
    created_by:{
        type: ObjectId //reference document : this is reference to the id of User collection
    }
});

module.exports = mongoose.model("Product", ProductSchema)