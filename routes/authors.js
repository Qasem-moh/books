const express = require("express")
const router = express.Router()
const joi = require("joi")
const { Author } = require('../models/Author.model')

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
 * get author by id
 */

router.get('/:id',async(req,res)=>{
try {
    
    const authorID=await Author.findById(req.params.id)
    res.status(200).json(authorID)
} catch (error) {
    res.status(500).json({message:"cannot get author by id"})
    console.log(error);
}
})

/**
 * @desc create new authour
 * 
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
router.put('/:id', (req, res) => {
    const { error } = createUpdateAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const author = authors.find(b => b.id === parseInt(req.params.id))
    if (author) {
        res.status(200).json({ message: "author has been updated" })
    } else {
        res.status(404).json({ message: "author not found" })
    }
})

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