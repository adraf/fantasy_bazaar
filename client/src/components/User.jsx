import { useLoaderData } from 'react-router-dom'
import { deleteUser } from '../utils/actions/userAction'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function User(){

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Loaders
  const singleUser = useLoaderData()

  const {
    id: userId,
    first_name,
    last_name,
    username,
    email,
  } = singleUser

  function handleAccountDelete() {
    deleteUser(userId)
    handleClose()
    localStorage.clear()
    window.location.href = '/register'
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete My Account
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

      <h1>User</h1>
      <div key={userId}>
        <p>{first_name}</p>
        <p>{last_name}</p>
        <p>{username}</p>
        <p>{email}</p>
      </div>
      {/* <button onClick={() => deleteUser(userId)}>Delete My Account</button> */}
    </>
  )
}