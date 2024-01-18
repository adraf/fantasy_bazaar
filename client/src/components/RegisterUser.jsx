import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
// import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer';


export default function RegisterUser(){

  const [inputs, setInputs] = useState({})
  const navigate = useNavigate()

  async function submitData(usersData) {
    try {
      await axios.post('api/auth/register/', usersData)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }
  // Disable button unless completed forms
  let fillFields = 0
  const vals = Object.values(inputs)
  const submitBtn = document.querySelector('.submit_button')
  vals.forEach(val => {
    if (val.length > 0) {
      fillFields += 1
      fillFields < 6 ? submitBtn.disabled = true : submitBtn.disabled = false
    } else if (val.length == 0) {
      fillFields - 1
      fillFields < 6 ? submitBtn.disabled = true : submitBtn.disabled = false
    }
  }) 

  function authenticate(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const usersData = Object.fromEntries(formData.entries())

    // TODO: password confirmation message - toast
    // if (usersData.password !== usersData.password_confirmation) {
      // const passwordToast = document.querySelector('.password_confirmation_toast')
      // passwordToast.style.display = 'none'
    // }
    submitData(usersData)
  }

  return (
    <>
    {/* // ! Make toast message? */}
      {/* <ToastContainer className="password_confirmation_toast d-inline-block m-2" position="top-end">
        <Toast className='bg-dark && text-white'>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Registration Error</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body className="bg dark">
            Passwords do not match
          </Toast.Body>
        </Toast>
      </ToastContainer> */}
      <h2>Register User</h2>
      <div>
        <form action='#' onSubmit={authenticate}>
          <input type='text' name='first_name' placeholder='First Name' value={inputs.first_name || ''} onChange={handleChange} required/>
          <input type='text' name='last_name' placeholder='Last Name' value={inputs.last_name || ''} onChange={handleChange} required/>
          <input type='text' name='email' placeholder='Email' value={inputs.email || ''} onChange={handleChange} required/>
          <input type='text' name='username' placeholder='Username' value={inputs.username || ''} onChange={handleChange} required/>
          <input type='password' name='password' placeholder='Password' value={inputs.password || ''} onChange={handleChange} required/>
          <input type='password' name='password_confirmation' placeholder='Confirm Password' value={inputs.password_confirmation || ''} onChange={handleChange} required/>
          <input type='submit' name='submit_button' className='submit_button' value='Join Us' disabled={true}/>
        </form>
      </div>
      <p>Already have an account?</p>
      <button><Link to='/login'>Login</Link></button>
    </>
  )
}