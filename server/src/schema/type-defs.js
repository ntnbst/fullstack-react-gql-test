const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    username: String
    createdOn: Float!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int!
    username: String
  }

  input UpdateUserInput {
    id: ID!
    name: String
    email: String
    username: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
  }
`

module.exports = { typeDefs }
