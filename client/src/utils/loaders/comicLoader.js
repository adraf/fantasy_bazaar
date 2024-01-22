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
      return favouriteComics
    } catch (error) {
      console.log(error)
    }
  }
  
  export async function filteredCharacterComicData(id) {
    try {
      const res = await axios.get('/api/comics/')
      const allComicData = res.data
      const featuredComics = allComicData.filter(comicChar => comicChar.characters.find(char => char.id == id))
      console.log('FCD', featuredComics)
      return featuredComics
    } catch (error) {
      console.log(error)
    }
  }

  // Get 10 random comics from collection for home page
  export async function getRandomTen() {
    try {
      const res = await axios.get('/api/comics/')
      const allComicData = res.data
      const allComicsCopy = [...allComicData]
      const randomComicsTen = allComicsCopy.sort(() => .5 - Math.random()).slice(0, 12)
      return randomComicsTen
    } catch (error) {
      console.log(error)
    }
  }


