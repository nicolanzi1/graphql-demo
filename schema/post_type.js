const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql
const mongoose = require('mongoose')

// Grab the user Model so that we can return a User Object in our author field
const User = mongoose.model('user')
const UserType = require('./user_type')

const PostType = new GraphQLObjectType({
    name: "PostType",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        date: { type: GraphQLString },
        author: {
            // Here we have to tell GraphQL we are explicitly returning another type.
            // The Author field will return a User Type!
            type: UserType,
            // We don't need any arguments because parentValue already has the author information
            resolve(parenValue) {
                return User.findById(parenValue.author)
                    .then(user => user)
                    .catch(err => null)
            }
        }
    }
})

module.exports = PostType