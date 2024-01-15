import axios from 'axios'
import { getToken } from '../helpers/common'

export async function getIndUser(id) {
  // console.log('Loader id', id)
  const res = await axios.get(`api/auth/user/${id}/`, {
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
  // console.log('Loader data', res.data)
  return res.data
}

export async function getUserData() {
  const res = await axios.get('api/auth/users/')
  // console.log(res.data)
  return res.data
}