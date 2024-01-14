import axios from 'axios'
import { useEffect, useState } from 'react'

// Bootstrap
import { Link } from 'react-router-dom'

export default function ComicsAll(){
  const [allComics, setAllComics] = useState([])

  useEffect(() => {
    async function getComicData() {
      try {
        const res = await axios.get('api/comics/')
        setAllComics(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getComicData()
  }, [])

  console.log(allComics)

  return (
    <>
      <h1>ComicsAll</h1>
      {allComics.map(comic => {
        const { id, artwork, title, release_date } = comic
        return (
          <div key={id}>
            <Link to={`/comics/${id}`}>Single Comic</Link>
            <p>{artwork}</p>
            <p>{title}</p>
            <p>{release_date}</p>
          </div>
        )
      })}
    </>
  )
}