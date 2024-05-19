const mongoose = require('mongoose');


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
const Author = mongoose.model("Author", AuthorSchema)

module.exports = {
    Author
}