const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')

const User = require('./models/User')

const Post = require('./models/Post')

const schema = require('./schema/schema')

const app = express()

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
)

const db = require('./config/keys').mongoURI

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err))

// app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

const router = express.Router()

const createNewUser = router.post("/new", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            // Throw a 400 error if the email address already exists
            return res
                .status(400)
                .json({ email: "A user has already registered with this address" })
        } else {
            // Otherwise create a new user
            console.log(req.body)
            const newUserObj = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            newUserObj
                .save()
                .then(savedUser => res.json(savedUser))
                .catch(err => console.log(err))
        }
    })
})

app.use("/users", createNewUser)

const createNewPost = router.post("/new", (req, res) => {
    // Remember to import your Post model from Mongoose!
    const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        date: req.body.date,
        author: req.body.author
    })

    newPost
        .save()
        .then(savedPost => res.json(savedPost))
        .catch(err => console.log(err))
})

app.use("/posts", createNewPost)

app.listen(5000, () => console.log('Server is running on port 5000'))