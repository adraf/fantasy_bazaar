import axios from 'axios'
import { getToken } from '../helpers/common'

export async function getIndUser(id) {
  const res = await axios.get(`api/auth/user/${id}/`, {
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
  return res.data
}

export async function getUserData() {
  const res = await axios.get('api/auth/users/')
  return res.data
}