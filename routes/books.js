const express = require("express");
const router = express.Router();
const Joi = require("joi")
const books = [
    {
        id: 1,
        title: "book1",
        author: "book1"
    },
    {
        id: 2,
        title: "book2",
        author: "book1"
    }, {
        id: 3,
        title: "book3",
        author: "book1"
    }, {
        id: 4,
        title: "book4",
        author: "book1"
    }, {
        id: 5,
        title: "book5",
        author: "book1"
    },
]
router.get('/', (req, res) => {
    res.json("Welcome in first route")
})
// router.get('/book', (req, res) => {
//     res.json(books)
// })

router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(400).json({ message: 'book is not found' })
    }
})

router.post('/', (req, res) => {

    const { error } = validateCreateBooks(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const book =
    {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        descraption: req.body.descraption,
        price: req.body.price,
        cover: req.body.cover

    }
    books.push(book)
    res.status(200).json(book)
})

/**
 * @desc update a book
 */

router.put('/:id', (req, res)=>{
    const { error } = validateUpdateBooks(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    const book=books.find(b=>b.id===parseInt(req.params.id))
    if(book){
        res.status(200).json({message:"book has been updated"})
    }elsse{
        res.status(404).json({message:"book not found"})
    }
})





function validateCreateBooks(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(5).max(30).required(),
        author: Joi.string().min(5).max(30).required(),
        descraption: Joi.string().min(5).max(30).required(),
        price: Joi.number().min(5).max(30).required(),
        cover: Joi.string().min(5).max(30).required(),

    })
    return schema.validate(obj)
}
function validateUpdateBooks(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(5).max(30),
        author: Joi.string().min(5).max(30),
        descraption: Joi.string().min(5).max(30),
        price: Joi.number().min(5).max(30),
        cover: Joi.string().min(5).max(30),

    })
    return schema.validate(obj)
}
module.exports = router