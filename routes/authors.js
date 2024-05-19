const express = require("express")
const router = express.Router()
const joi = require("joi")
const { Author } = require('../models/Author.model')

/**
 * @desc get all author
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get('/', async (req, res) => {
    try {
        const authorList = await Author.find()
        // .sort({firstname:1}).select("firstname lastname -_id")
        res.status(200).json(authorList)
        console.log(authorList);
    } catch (error) {
        res.status(500).json({ message: "cant get all authors..." })
        console.log(error);
    }
})


/**
 * @desc get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */

router.get('/:id', async (req, res) => {
    try {

        const authorID = await Author.findById(req.params.id)
        res.status(200).json(authorID)
    } catch (error) {
        res.status(500).json({ message: "cannot get author by id" })
        console.log(error);
    }
})

/**
 * @desc create a new author
 * @route /api/authors
 * @method POST
 * @access public
 */

router.post('/', async (req, res) => {
    const { error } = createNewAuthor(req.body)
    if (error) {
        return res.status(404).json({ message: error.details[0].message })
    }
    try {
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
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error............." })
    }
})

/**
 * @desc update author
 * @route /api/authors/:id
 * @method UPDATE
 * @access public
 */
router.put('/:id', async (req, res) => {
    const { error } = createUpdateAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    try {
        const author = await Author.findByIdAndUpdate(
            req.params.id
            , {
                $set:{
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    nationality: req.body.nationality,
                    image: req.body.image
                }
            },
            { new: true }
        )//new is object function to get a new object updated

        res.status(200).json(author)

    } catch (error) {

        console.log(error);
        res.status(500)
        json({ message: "can't update" })

    }
})

/**
 * @desc delet author
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
router.delete('/:id', (req, res) => {
    const author = authors.find(b => b.id === parseInt(req.params.id))
    if (author) {
        return res.status(200).json({ message: 'author was deleted' })
    } else {
        return res.status(404).json({ message: 'author not found' })
    }
})

function createNewAuthor(obj) {
    const schema = joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        nationality: joi.string().min(2).max(10),
        image: joi.string()
    })

    return schema.validate(obj)
}
function createUpdateAuthor(obj) {
    const schema = joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        nationality: joi.string().min(2).max(10),
        image: joi.string()
    })

    return schema.validate(obj)
}
module.exports = router