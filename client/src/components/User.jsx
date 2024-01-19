import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { useState } from 'react';
import { deleteUser } from '../utils/actions/userAction'
import { activeUser, removeToken } from '../utils/helpers/common';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function User(){

  const [mainUserInfo, setMainUserInfo] = useOutletContext() 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  const {
    id: userId,
    first_name,
    last_name,
    username,
    email,
    // comics_fav,
  } = mainUserInfo

  function handleAccountDelete() {
    deleteUser(userId)
    handleClose()
    removeToken()
    setMainUserInfo('')
    navigate('/register')
  }

  const comicData = useLoaderData()
  const allComicData = comicData.comicInfo 
  const favouriteComics = allComicData.filter(comicFav => comicFav.favourites.find(fav => fav.id === activeUser()))
  // console.log(favouriteComics)


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete My Account
      </Button>

      <Button variant="primary" href={`/auth/user/${userId}/edit/`}>
        Edit Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {first_name || last_name !== '' ? 
            <Modal.Title>{first_name} {last_name} ({username})</Modal.Title>
            :
            <Modal.Title>{username}</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body>Are you sure you would like to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {/* <Button variant="primary" onClick={() => deleteUser(userId)}> */}
          <Button variant="primary" onClick={handleAccountDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <h2>User</h2>
      <div key={userId}>
        <p>{first_name}</p>
        <p>{last_name}</p>
        <p>{username}</p>
        <p>{email}</p>
        <div id='single-page-linked-content'>
          <section>
            
            {favouriteComics.map(comic => {
              const { id, artwork, title, release_date } = comic
              return (
                <Link key={id} id={id} to={`/comics/${id}`} className='all-comics-section'>
                  <div className='all-comics-image' style={{ backgroundImage: `url(${artwork})` }}>
                  </div>
                  <div className='all-comics-info-div'>
                    <p>{title}</p>
                    <p>{release_date}</p>
                  </div>
                </Link>
              )
            })}
          </section>
        </div>
      </div>
    </>
  )
}