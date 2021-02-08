const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

//async func to send queiries to db, all queries willl go here
async function main() {
    const newLink = await prisma.link.create({
        data: {
          description: 'Fullstack tutorial for GraphQL',
          url: 'www.howtographql.com',
        },
      })
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}

//call func, catch error if exists, close db when script terminates
main()
    .catch(e => {
        throw e
    })

    .finally(async () => {
        await prisma.$disconnect()
    })