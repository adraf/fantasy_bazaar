import axios from 'axios'
import { useEffect, useState } from 'react'
import { addFavourite } from '../utils/actions/userAction'
import { activeUser } from '../utils/helpers/common'
import { Link } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/esm/Spinner'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function ComicsAll(){
  // States
  const [allComics, setAllComics] = useState([])
  const [showToast, setShowToast] = useState(false)
  const toggleShowToast = () => setShowToast(!showToast)

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
  
  // Checks if fave should be on or off
  function isFavourite(userId, arr) {
    return arr.some(user => user.id === userId)
  }

  async function handleFavourite(event, id) {
    event.preventDefault()
    const allComicsCopy = [...allComics]
    const updatedComic = await addFavourite(id)
    const replaceComic = allComicsCopy.findIndex(comic => comic.id === updatedComic.id)
    allComicsCopy[replaceComic] = updatedComic
    setAllComics(allComicsCopy)
  } 

  // Run Toast
  function divertFavourite(event) {
    event.preventDefault()
    setShowToast(true)
  }

  async function aToZTitle() {
    const allComicsCopy = [...allComics]
    const filterA = allComicsCopy.sort((a, b) => (a.title > b.title) ? 1 : -1)
    setAllComics(filterA)
    return allComics
  }

  async function zToATitle() {
    const allComicsCopy = [...allComics]
    const filterA = allComicsCopy.sort((a, b) => (a.title > b.title) ? 1 : -1)
    setAllComics(filterA.reverse())
    return allComics
  }

  async function oldNew() {
    const allComicsCopy = [...allComics]
    const filterA = allComicsCopy.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1)
    setAllComics(filterA)
    return allComics
  }

  async function newOld() {
    const allComicsCopy = [...allComics]
    const filterA = allComicsCopy.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1)
    setAllComics(filterA.reverse())
    return allComics
  }

  const charList = []
  async function characters() {
    const allComicsCopy = [...allComics]
    const filterChar = allComicsCopy.map(comics => comics.characters.map(char => char.name))
    const filteredCharList = filterChar.flat()
    filteredCharList.sort()
    charList.push(removeDupes(filteredCharList))
  }
  characters()

  function removeDupes(data) {
    return [...new Set(data)]
  }
  // charList.push(removeDupes(charList))

  // function aToZAuthor() {
  //   const allComicsCopy = [...allComics]
  //   const filterA = allComicsCopy.sort((a, b) => (a.author > b.author) ? 1 : -1)
  //   setAllComics(filterA)
  //   return allComics
  // }

  // function zToAAuthor() {
  //   const allComicsCopy = [...allComics]
  //   const filterA = allComicsCopy.sort((a, b) => (a.author > b.author) ? 1 : -1)
  //   setAllComics(filterA.reverse())
  //   return allComics
  // }
  
  return (
      <section id='all-comics-main'>
        <Toast show={showToast} onClose={toggleShowToast} className='position-absolute top-50 start-50 translate-middle bg-dark text-white'>
          <Toast.Header className='bg-dark text-white' closeVariant='white'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-chat-heart" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2m-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125M8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
            </svg>
            <strong className="me-auto ms-auto">Favourite</strong>
          </Toast.Header>
          <Toast.Body className='text-center'>You need to be logged in to save items to your favourites</Toast.Body>
        </Toast>
        <nav className='filter-nav-comics-all'>
          <Nav id='filter-nav'>
            <NavDropdown title="Character" id="basic-nav-dropdown">
              {charList.map(char => {
                const { id: charId, character } = char
                  return (
                    <NavDropdown.Item key={charId} onClick={'#'}>{character}</NavDropdown.Item>
                  )
                })
              }
            </NavDropdown>
            {/* <NavDropdown title="Character" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={'#'}>A to Z&nbsp;<i className="bi bi-arrow-down"></i></NavDropdown.Item>
              <NavDropdown.Item onClick={'#'}>Z to A&nbsp;<i className="bi bi-arrow-up"></i></NavDropdown.Item>
            </NavDropdown> */}
            <NavDropdown title="Title" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={aToZTitle}>A to Z&nbsp;<i className="bi bi-arrow-down"></i></NavDropdown.Item>
              <NavDropdown.Item onClick={zToATitle}>Z to A&nbsp;<i className="bi bi-arrow-up"></i></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Release Date" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={newOld}>New to old&nbsp;<i className="bi bi-arrow-down"></i></NavDropdown.Item>
              <NavDropdown.Item onClick={oldNew}>Old to new&nbsp;<i className="bi bi-arrow-up"></i></NavDropdown.Item>
            </NavDropdown>
            {/* <NavDropdown title="Author" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={aToZAuthor}>A to Z&nbsp;<i className="bi bi-arrow-down"></i></NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </nav>
        {allComics === null ? 
          <div className="spinner">
            {/* <img src="https://i0.wp.com/boingboing.net/wp-content/uploads/2015/10/pJReN4H1.gif?w=970" alt="loading..." /> */}
            <Spinner animation="border">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        : allComics.map(comic => {
          const { id, artwork, title, release_date, favourites } = comic
          return (
            <Link key={id} id={id} to={`/comics/${id}`} className='all-comics-section'>
              <div className='all-comics-image' style={{ backgroundImage: `url(${artwork})` }}>
                <div className='all-comics-favourite-btn' onClick={(e) => activeUser() !== null ? handleFavourite(e, id) : divertFavourite(e)}>
                  <div className='favourite-icon'>
                    {isFavourite(activeUser(), favourites) ? faveHeart : noFaveHeart}
                  </div>
                </div>
              </div>
              <div className='all-comics-info-div'>
                <p>{title}</p>
                <p>{release_date.split('-').shift(0,1)}</p>
              </div>
            </Link>
          )
        })}
      </section>
  )
}