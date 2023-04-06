const mongoose = require("mongoose")
const { SELLER, BUYER } = require("../constant/role")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (value) {
                let exists = await mongoose.models.User.findOne({ email: value })
                if (exists) {
                    return false
                }
            },
            message: "email already exists"
        }
    },
    role: {
        type: String,
        enum: [SELLER, BUYER],
        set: function (value) {
            return value.toLowerCase()
        }
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", UserSchema)