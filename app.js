const express = require("express");
const mongoose = require('mongoose');
const booksPath = require("./routes/books");
const authorsPath = require('./routes/authors')
const authPath=require('./routes/auth')
const user = require('./routes/User')
const logger = require('./middlewares/logger')
const dotenv = require("dotenv");
const { noFound, errHandler } = require("./middlewares/errors");
dotenv.config()

// create connection DB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("connected")).catch(() => console.log("error"));

// Init App
const app = express()
const port = process.env.PORT

// Apply Middleware
app.use(express.json())
app.use(logger)

//Routes
app.use('/api/books', booksPath)
app.use("/api/authors", authorsPath)
app.use("/api/auth", authPath)

// //Error Handel Middlware

app.use(noFound);
app.use(errHandler);



// Running The Server
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})