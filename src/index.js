const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const { posts } = require('./data/posts.js')

const typeDefs = `
type Query {
    post(postId: Int!): Post
    allPosts: [Post!]!
}

type Post {
    id: Int
    title: String
    content: String
}

type Mutation {
    addPost(title: String!, content: String!): Post
}
`

const resolvers = {
  Query: {
    note: async (_args, context, info) => {
      const note = await context.db.query.note(
        {
          where: {
            id: args.where.id,
          },
        },
        info,
      )
      return note
    },
    notes: async (_, args, context, info) => {
      const notes = await context.db.query.notes(null, info)
      return notes
    },
  },
  Mutation: {
    createNote: async (_, args, context, info) => {
      const note = await context.db.mutation.createNote(
        {
          data: {
            title: args.data.title,
            content: args.data.content,
          },
        },
        info,
      )
      return note
    },

    updateNote: async (_, args, context, info) => {
      const note = await context.db.mutation.updateNote(
        {
          where: {
            id: args.where.id,
          },
          data: {
            title: args.data.title,
            content: args.data.content,
          },
        },
        info,
      )
      return note
    },
    deleteNote: async (_, args, context, info) => {
      const note = await context.db.mutation.deleteNote(
        {
          where: {
            id: args.where.id,
          },
        },
        info,
      )
      return note
    },
  },
}

const server = new GraphQLServer({
  typeDefs: '/home/sajeel/Projects/GraphQLYoga/src/generated/prisma.graphql',
  resolvers,
  context: {
    db: new Prisma({
      typeDefs:
        '/home/sajeel/Projects/GraphQLYoga/src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
    }),
  },
})

server.start(() => {
  console.log(`Server is running at http://localhost:4000`)
})
