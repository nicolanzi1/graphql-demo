const graphql = require('graphql')
const { GraphQLSchema } = graphql

const RootQueryType = require('./root_query_type')
const mutations = require('./mutations')

// Add our mutations to the Schema
module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: mutations
})