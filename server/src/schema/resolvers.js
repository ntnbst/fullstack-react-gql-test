const { UserData } = require('../FakeData')

const resolvers = {
  Query: {
    users: () => {
      return UserData
    },
    user: (_, args) => {
      const id = args.id
      const foundUser = UserData.find((user) => Number(user.id) === Number(id))
      return foundUser
    },
  },
  Mutation: {
    createUser: (_, args) => {
      const user = args.input
      const lastId = UserData.at(-1).id
      user.id = lastId + 1
      user.createdOn = Date.now()
      UserData.push(user)
      return user
    },
    updateUser: (_, args) => {
      const { id, name, email, username } = args.input
      const foundUser = UserData.find((user) => Number(user.id) === Number(id))
      if (foundUser) {
        if (name) {
          foundUser.name = name
        }
        if (email) {
          foundUser.email = email
        }
        if (username) {
          foundUser.username = username
        }
        return foundUser
      } else {
        return null
      }
    },
  },
}

module.exports = { resolvers }
