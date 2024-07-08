const Joi = require("joi")
const mongoose = require("mongoose")

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 250,
        minlength: 5,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    },
    descraption: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    price: {
        type: Number,
        required: true,
        minlength: 0,
    },
    cover: {
        type: String,
        required: true,
        enum: ["soft cover", "hard cover"]

    }
}, { timestamps: true })
function validateCreateBooks(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(5).max(250).required(),
        author: Joi.string().required(),
        descraption: Joi.string().min(5).required(),
        price: Joi.number().min(5).required(),
        cover: Joi.string().valid("soft cover", "hard cover").required(),

    })
    return schema.validate(obj)
}
function validateUpdateBooks(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(5).max(250).required(),
        author: Joi.string().required(),
        descraption: Joi.string().min(5).required(),
        price: Joi.number().min(5).required(),
        cover: Joi.string().valid("soft cover", "hard cover").required(),

    })
    return schema.validate(obj)
}
const Book = mongoose.model("Book", booksSchema)

module.exports = {
    Book,
    validateCreateBooks,
    validateUpdateBooks
}