const express = require("express")
const booksPath = require("./routes/books");


const app = express()
const port = process.env.PORT || 3001
app.use(express.json())
app.use('/api/books', booksPath)
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})