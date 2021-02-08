const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

//update fields to connect with context, from prisma
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => async (parent, args, context) => {
              return context.prisma.feed.findMany()
        
        },
    },

    Mutation: {
        post: (parent, args, context, info) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            })
       
            return newLink
        },
        
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
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId:
            req && req.headers.authorization
            ? getUserId(req)
            : null
        };
        
    }
});

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );