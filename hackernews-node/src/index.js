const { ApolloServer } = require('apollo-server');

// add field, object; then define that object
const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!  
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`
// add a feed resolver; add Link resolvers
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}


const server = new ApolloServer ({
    typeDefs,
    resolvers,
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );

    