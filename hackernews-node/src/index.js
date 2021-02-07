const { ApolloServer } = require('apollo-server');

const typeDefs = `
    type Query {
        info: String!
    }
`

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`
    }
}

// uncomment below and comment out above to see
// how graphql will adhere to the schema created in typedefs
// typedefs defined that info will be some sort of string
// by doing below, graphql will return an error
// const resolvers = {
//     Query: {
//       info: () => null,
//     }
//   }

const server = new ApolloServer ({
    typeDefs,
    resolvers,
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );

    