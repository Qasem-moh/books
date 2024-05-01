const express = require("express")
const Joi = require('joi');


const app = express()
const port = process.env.PORT || 3001
app.use(express.json())
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
app.get('/', (req, res) => {
    res.json("Welcome in first route")
})
app.get('/book', (req, res) => {
    res.json(books)
})

app.get('/book/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(400).json({ message: 'book is not found' })
    }
})

app.post('/new', (req, res) => {

    const schema = Joi.object({
        title: Joi.string().trim().min(5).max(30).required(),
        author: Joi.string().min(5).max(30).required(),
        descraption: Joi.string().min(5).max(30).required(),
        price: Joi.number().min(5).max(30).required(),
        cover: Joi.string().min(5).max(30).required(),

    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({message:error.details})
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})