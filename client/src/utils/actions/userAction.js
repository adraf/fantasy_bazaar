import axios from 'axios'
import { getToken } from '../helpers/common'
import { redirect } from 'react-router-dom'

export async function deleteUser(id) {
  await axios.delete(`/api/auth/user/${id}/`, {
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
  console.log('complete')
  return redirect('/register')
}

// Add and take off Favourite Comic
export async function addFavourite(id) {
  const res = await axios.patch(`/api/comics/${id}/favourite/`, {
      data: {
        'favourites': []
      }
    },
    {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    }
  )
  console.log('PATCH', res.data)
  return res.data
}
