import axios from 'axios'
import { useEffect, useState } from 'react'
import { addFavourite } from '../utils/actions/userAction'
// Bootstrap
import { Link } from 'react-router-dom'
import { activeUser } from '../utils/helpers/common'

export default function ComicsAll(){
  // States
  const [allComics, setAllComics] = useState([])

  // ! Change in App and pass down
  // const currentUserID = localStorage.getItem('currentUserID')

  const currentUserID = activeUser()

  const faveHeart = 
  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" className="bi bi-chat-heart-fill" viewBox="0 0 16 16">
    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15m0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
  </svg>
  const noFaveHeart = 
  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" className="bi bi-chat-heart" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2m-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125M8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
  </svg>

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
  
  function isFavourite(userId, arr) {
    return arr.some(user => user.id === currentUserID)
  }

  return (
    <>
      <section id='all-comics-main'>
        {allComics.map(({ id, artwork, title, release_date, favourites }) => {
          // console.log(favourites)
          function handleFavourite(event) {
            event.preventDefault()
            // Gets ID of clicked parent container
            const btnParentId = event.target.closest('.all-comics-section').id
            addFavourite(btnParentId)
          }
          return (
            <Link key={id} id={id} to={`/comics/${id}`} className='all-comics-section'>
              <div className='all-comics-image' style={{ backgroundImage: `url(${artwork})` }}>
                <div className='all-comics-favourite-btn' onClick={handleFavourite}>
                  <div className='favourite-icon'>
                    {
                      isFavourite(currentUserID, favourites) ? faveHeart : noFaveHeart
                    }
                  </div>
                </div>
              </div>
              <div className='all-comics-info-div'>
                <p>{title}</p>
                <p>{release_date}</p>
              </div>
            </Link>
          )
        })}
      </section>
    </>
  )
}