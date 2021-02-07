const { ApolloServer } = require('apollo-server');

// add field, object; then define that object
//add mutation definition for a post for a Link object
const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!  
    }

    type Mutation {
        post(url: String!, description: String!): Link!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`
//add data to example since not yet in db
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]


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

    