const express = require("express");
const mongoose = require('mongoose');
const booksPath = require("./routes/books");
const authorsPath = require('./routes/authors')

// create connection DB
mongoose
    .connect("mongodb://localhost/bookstoreDB")
    .then(() => console.log("connected"))
    .catch(()=>console.log("error"))
    
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use('/api/books', booksPath)
app.use("/api/authors", authorsPath)
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})