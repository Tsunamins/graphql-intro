//needed to resolve the links field, bc graphql schema cannot infer

function links(parent, args, context) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).links()
  }
  
  module.exports = {
    links,
  }