import axios from 'axios'

export const getUsers = async () => {
  const { data } = await axios.get('https://reqres.in/api/users?page=2')
  const usersResult = data.data
  localStorage.setItem('users', JSON.stringify(usersResult))
}
