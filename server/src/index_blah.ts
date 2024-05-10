import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { Authentication, AuthenticationKey, UserInterface } from "./authentication";

const authentication = new Authentication();

const typeDefs = `#graphql
  #comments
  type Book {
    title: String
    author: String
  }

  type AuthenticationToken {
    token: String
  }

  type Query {
    books: [Book]
  }
  type Mutation {
    login: AuthenticationToken
  }
`;

const books: {title: string, author: string}[] = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  }
]

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    login: async (_, key: AuthenticationKey) => {
      // const token = authentication.authenticate(key);
      // return {token};
      return {token: 'blah'}
    }
  }
}
// https://www.apollographql.com/docs/apollo-server/security/authentication/


interface MyContext {
  user: UserInterface
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async({ req, res }) => {
    const token = req.headers.authorization || '';
    const user = await authentication.getUser(token);
    if (!user) {
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }
    return { user }
  }
})

console.log(`🚀 Server ready at: ${url}`);