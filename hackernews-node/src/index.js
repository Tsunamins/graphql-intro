const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const path = require('path');

//add data to example since not yet in db
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]


//find current length of data:
let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },

    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`, //increment count for id
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        }
        
    },
}

//instance of prisma here, to be placed into context below
const prisma = new PrismaClient()

const server = new ApolloServer ({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
    }
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );