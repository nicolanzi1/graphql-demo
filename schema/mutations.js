const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql
const mongoose = require('mongoose')
const UserType = require('./user_type')
const PostType = require('./post_type')

const User = mongoose.model('user')
const Post = mongoose.model('post')

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // This will be the name of this mutation
        newUser: {
            // Creating a User Type
            type: UserType,
            args: {
                // Since we need these arguments to make a user we'll make them GraphQLNull
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { name, email, password }) {
                return new User({ name, email, password }).save()
            }
        },
        newPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                body: { type: new GraphQLNonNull(GraphQLString) },
                author: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { title, body, author, date }) {
                return new Post({ title, body, author, date }).save()
            }
        }
    }
})

module.exports = mutation