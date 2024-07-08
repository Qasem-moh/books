const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler")
const { Book, validateCreateBooks, validateUpdateBooks } = require('../models/Books.model')

/**
 * @desc get all books 
 * @route api/books/
 * @methos get
 * @status public
 */
router.get('/', asyncHandler(
    async (req, res) => {
        const books = await Book.find()
        if (books) {
            res.status(200).json(books)
        } else {
            res.status(500).json({ message: "can't get books" })
        }
    }
))

router.get('/:id', asyncHandler(
    async (req, res) => {
        const book = await Book.findById(req.params.id)
        if (book) {
            res.status(200).json(book)
        } else {
            res.status(400).json({ message: 'book is not found' })
        }
    }
))

router.post('/', asyncHandler(
    async (req, res) => {

        const { error } = validateCreateBooks(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            descraption: req.body.descraption,
            price: req.body.price,
            cover: req.body.cover
        })
        const result = await book.save()
        res.status(200).json(result)
    }
))

/**
 * @desc update a book
 */

router.put('/:id', asyncHandler(
    async (req, res) => {
        const { error } = validateUpdateBooks(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const updateBook = await
            Book.findByIdAndUpdate(req.params.id, {
                $set: {
                    title: req.body.title,
                    author: req.body.author,
                    descraption: req.body.descraption,
                    price: req.body.price,
                    cover: req.body.cover
                }
            },
                { new: true }
            )
        res.status(200).json(updateBook)
    }
))


/**
 * @desc delete a book
 */
// books.find(b => b.id === parseInt(req.params.id))
router.delete('/:id', asyncHandler(
    async (req, res) => {

        const book = await Book.findById(req.params.id)
        if (book) {
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "book has been deleted" })
        } else {
            res.status(404).json({ message: "book not found" })
        }
    }
))




module.exports = router