const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const { Author, createNewAuthor, createUpdateAuthor } = require('../models/Author.model')

/**
 * @desc get all author
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get('/', asyncHandler(
    async (req, res) => {
        const authorList = await Author.find()
        // .sort({firstname:1}).select("firstname lastname -_id")
        res.status(200).json(authorList)
        console.log(authorList);
    }
))
/**
 * @desc get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get('/:id', asyncHandler(
    async (req, res) => {
        const authorID = await Author.findById(req.params.id)
        res.status(200).json(authorID)
    }
))
/**
 * @desc create a new author
 * @route /api/authors
 * @method POST
 * @access public
 */
router.post('/', asyncHandler(async (req, res) => {
    const { error } = createNewAuthor(req.body)
    if (error) {
        return res.status(404).json({ message: error.details[0].message })
    }
    const author = new Author(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nationality: req.body.nationality,
            image: req.body.image
        }
    )
    const result = await author.save()
    res.status(200).json(result)
}))
/**
 * @desc update author
 * @route /api/authors/:id
 * @method UPDATE
 * @access public
 */
router.put('/:id', asyncHandler(async (req, res) => {
    const { error } = createUpdateAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const author = await Author.findByIdAndUpdate(
        req.params.id
        , {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                nationality: req.body.nationality,
                image: req.body.image
            }
        },
        { new: true }
    )//new is object function to get a new object updated
    res.status(200).json(author)
}))
/**
 * @desc delet author
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id)
        if (author) {
            await Author.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: 'author was deleted' })
        } else {
            res.status(500).json({ message: 'author not found' })
        }
}))
module.exports = router