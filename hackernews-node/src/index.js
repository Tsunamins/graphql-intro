const { ApolloServer } = require('apollo-server');
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


const server = new ApolloServer ({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );