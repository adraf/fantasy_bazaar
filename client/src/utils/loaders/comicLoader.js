import axios from 'axios'
import { activeUser } from '../helpers/common'

export async function getIndComic(id) {
  const res = await axios.get(`/api/comics/${id}/`)
  // console.log(res.data)
  return res.data
}

export async function getComicData() {
    try {
      const res = await axios.get('/api/comics/')
      // console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  export async function filteredComicData() {
    try {
      const res = await axios.get('/api/comics/')
      const allComicData = res.data
      const favouriteComics = allComicData.filter(comicFav => comicFav.favourites.find(fav => fav.id === activeUser()))
      // console.log('FCD', favouriteComics)
      return favouriteComics
    } catch (error) {
      console.log(error)
    }
  }


