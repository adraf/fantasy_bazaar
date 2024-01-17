import axios from 'axios'

export async function getIndComic(id) {
  const res = await axios.get(`api/comics/${id}/`)
  // console.log(res.data)
  return res.data
}