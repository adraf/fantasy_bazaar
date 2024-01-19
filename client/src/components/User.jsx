import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { useState } from 'react';
import { deleteUser } from '../utils/actions/userAction'
import { removeToken } from '../utils/helpers/common';
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
  } = mainUserInfo

  function handleAccountDelete() {
    deleteUser(userId)
    handleClose()
    removeToken()
    setMainUserInfo([])
    navigate('/register')
  }

  const filteredComics = useLoaderData()

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className='dark text-white'>
        <Modal.Header closeButton className='bg-danger' closeVariant='white'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-person-x" viewBox="0 0 16 16">
            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"/>
          </svg>
          {first_name || last_name !== '' ? 
            <Modal.Title className='h6 me-auto ms-auto'> {first_name} {last_name} ({username})</Modal.Title>
            :
            <Modal.Title className='h6 me-auto ms-auto'>{username}</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body className='bg-danger text-center'>Are you sure you would like to delete your account?</Modal.Body>
        <Modal.Footer className='bg-danger'>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAccountDelete}>
            Yes, I want to delete
          </Button>
        </Modal.Footer>
      </Modal>
    <section key={userId} className='single-user-main'>
      <section className='single-page-top'>
        <div className='user-btn-div'>
          <Button variant="primary" onClick={handleShow}>
            Delete Account
          </Button>
          <Button variant="primary" href={`/auth/user/${userId}/edit/`}>
            Edit Account
          </Button>
        </div>
        <div className='single-page-information' id='user-info-div'>
          <h2 className='single-page-title'>{!first_name ? username : first_name}&apos;s Account</h2>
          <p>First Name: {first_name}</p>
          <p>Last Name: {last_name}</p>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      </section>
        <div>
          <section className='single-page-linked-content'>
            {filteredComics.comicInfo.map(comic => {
              const { id: comicId, artwork, title, release_date } = comic
              return (
                <Link key={comicId} id={comicId} to={`/comics/${comicId}`} className='all-comics-section content-div' >
                  <div className='all-comics-image' style={{ backgroundImage: `url(${artwork})` }}>
                  </div>
                  <div className='all-comics-info-div'>
                    <p>{title}</p>
                    <p>{release_date.split('-').shift(0,1)}</p>
                  </div>
                </Link>
              )
            })}
          </section>
        </div>
      </section>
    </>
  )
}