import axios from 'axios'

export async function getIndComic(id) {
  const res = await axios.get(`api/comics/${id}/`)
  // console.log(res.data)
  return res.data
}


export async function getComicData() {
    try {
      const res = await axios.get('api/comics/')
      // console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

