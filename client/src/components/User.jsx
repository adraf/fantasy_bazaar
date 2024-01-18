import { useLoaderData, useNavigate } from 'react-router-dom'
import { deleteUser } from '../utils/actions/userAction'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function User(){

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const navigate = useNavigate()

  // Loaders
  const singleUser = useLoaderData()
  console.log(singleUser)
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
    // ! Change?
    navigate('/register')
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete My Account
      </Button>

      <Button variant="primary" href='/auth/user/edit/'>
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
      



      {/* <Button variant="primary" onClick={handleShow}>
        Edit Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Peter"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Parker"
              />
            </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="peter@dailybugle.com"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
     */}


      <h2>User</h2>
      <div key={userId}>
        <p>{first_name}</p>
        <p>{last_name}</p>
        <p>{username}</p>
        <p>{email}</p>
      </div>
    </>
  )
}