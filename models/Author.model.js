const mongoose = require('mongoose');
const joi = require("joi")

const AuthorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 8,
        minlength: 3
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 8,
        minlength: 5
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        maxlength: 8,
        minlength: 5
    },

    image: {
        type: String,
        default: "default-avater.png"
    }

}, {
    timestamps: true
})

/**
 * @desc create New Author
 * @route 
 * @method function
 * @access public
 */
function createNewAuthor(obj) {
    const schema = joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        nationality: joi.string().min(2).max(10),
        image: joi.string()
    })

    return schema.validate(obj)
}

/**
 * @desc valdation update Author
 * @route 
 * @method function
 * @access public
 */
function createUpdateAuthor(obj) {
    const schema = joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        nationality: joi.string().min(2).max(10),
        image: joi.string()
    })

    return schema.validate(obj)
}

const Author = mongoose.model("Author", AuthorSchema)

module.exports = {
    Author,
    createNewAuthor,
    createUpdateAuthor
}