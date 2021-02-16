const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql
const mongoose = require('mongoose')
const User = mongoose.model('user')

const UserType = new GraphQLObjectType({
    name: 'UserType',
    // Create a closure to create a new scope!
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        posts: {
            // Here we are requiring the Post type
            type: new graphql.GraphQLList(require('./post_type')),
            resolve(parentValue) {
                return (
                    User.findById(parentValue.id)
                    // Populate is a mongoose method
                        .populate('posts')
                        .then(user => user.posts)
                )
            }
        }
    })
})

module.exports = UserType