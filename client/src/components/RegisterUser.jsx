import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'

export default function RegisterUser(){

  const [inputs, setInputs] = useState({})
  const [showToast, setShowToast] = useState(false)

  const toggleShowToast = () => setShowToast(!showToast)

  const navigate = useNavigate()

  async function submitData(usersData) {
    try {
      await axios.post('api/auth/register/', usersData)
      navigate('/login')
    } catch (error) {
      console.log(error)
      setShowToast(true)
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
    submitData(usersData)
  }

  return (
    <section id='register-main'>
      <Toast show={showToast} onClose={toggleShowToast} className='position-absolute top-50 start-50 translate-middle bg-dark text-white'>
        <Toast.Header className='bg-dark text-white' closeVariant='white'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
          </svg>
          <strong className="me-auto ms-auto">Registration Error</strong>
        </Toast.Header>
        <Toast.Body className='text-center'>Your Passwords do not match</Toast.Body>
      </Toast>
      <div className='form-div-container'>
        <form action='#' onSubmit={authenticate}>
          <input type='text' name='first_name' placeholder='First Name' value={inputs.first_name || ''} onChange={handleChange} required/>
          <input type='text' name='last_name' placeholder='Last Name' value={inputs.last_name || ''} onChange={handleChange} required/>
          <input type='text' name='email' placeholder='Email' value={inputs.email || ''} onChange={handleChange} required/>
          <input type='text' name='username' placeholder='Username' value={inputs.username || ''} onChange={handleChange} required/>
          <input type='password' name='password' placeholder='Password' value={inputs.password || ''} onChange={handleChange} required/>
          <input type='password' name='password_confirmation' placeholder='Confirm Password' value={inputs.password_confirmation || ''} onChange={handleChange} required/>
          <input type='submit' name='submit_button' className='submit_button' value='Join Us' disabled={true}/>
        </form>
        <p className='form-p'>Already have an account?</p>
        <button><Link to='/login'>Login</Link></button>
      </div>
    </section>
  )
}