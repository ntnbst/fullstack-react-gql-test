import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

const USER_LIST_QUERY = gql`
  query GetUserList {
    users {
      id
      name
      age
      username
      email
      createdOn
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      age
      email
    }
  }
`

export default function UserList() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [username, setUserName] = useState('')
  const { loading, error, data, refetch } = useQuery(USER_LIST_QUERY)

  const [createUser, { error: createUserError, data: createUserData, loading: createUserLoading }] =
    useMutation(CREATE_USER_MUTATION)

  const handleCreateUser = () => {
    createUser({
      variables: {
        input: {
          name,
          email,
          username,
          age,
        },
      },
    })
    refetch()
  }

  if (loading) {
    return 'Loading...'
  }
  return (
    <div>
      <p>Create User</p>

      <input placeholder='Enter Name' type='text' onChange={(e) => setName(e.target.value)} />
      <input placeholder='Enter Age' type='text' onChange={(e) => setAge(Number(e.target.value))} />
      <input placeholder='Enter Email' type='text' onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder='Choose Username'
        type='text'
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleCreateUser}>Create</button>

      <h2> UserList</h2>
      {error && <ErrorComponent />}
      {data && <Users data={data} />}
    </div>
  )
}

function Users({ data }) {
  return data.users
    .toSorted((a, b) => b.createdOn - a.createdOn)
    .map((user) => <UserCard key={user.id} user={user} />)
}

function UserCard({ user }) {
  return (
    <div style={{ padding: '8px', border: '1px solid #ccc', margin: '16px 0' }}>
      <KeyVal title='Name' val={user.name} />
      <KeyVal title='Username' val={user.username} />
      <KeyVal title='Age' val={user.age} />
      <KeyVal title='Email' val={user.email} />
      <KeyVal title='Member Since' val={new Date(user.createdOn).toLocaleDateString()} />
    </div>
  )
}

function KeyVal({ title, val }) {
  return (
    <p>
      <strong>{title}: </strong>
      {val}
    </p>
  )
}

function ErrorComponent({ text = 'Something went wrong!' }) {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  )
}
