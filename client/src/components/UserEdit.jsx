import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { activeUser, getToken } from '../utils/helpers/common'
import { useOutletContext } from 'react-router-dom'


export default function UserEdit(){ 
  const userId = activeUser()
  const navigateTo = useNavigate()
  const [inputs, setInputs] = useState({})
  // eslint-disable-next-line no-unused-vars
  const [mainUserInfo, setMainUserInfo] = useOutletContext() 

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
      fillFields < 3 ? submitBtn.disabled = true : submitBtn.disabled = false
    } else if (val.length == 0) {
      fillFields - 1
      fillFields < 3 ? submitBtn.disabled = true : submitBtn.disabled = false
    }
  }) 

  async function submitEdit(usersData) {
    // event.preventDefault()
    // correct edited data in 'usersdata' at this point
    try {
      const res = await axios.patch(`/api/auth/user/${userId}/`, usersData, {
        headers: {
          'Authorization': 'Bearer ' + getToken()
        }
      })
        setMainUserInfo(res.data)
        redirect()
        return res.data
      } catch (error) {
        console.log(error)
      }
    }
  
    async function redirect() {
      navigateTo(`/auth/user/${activeUser()}/`)
    }

  async function authenticate(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const usersData = Object.fromEntries(formData.entries())
    // correct edited data in 'usersdata' at this point
    await submitEdit(usersData)
  }

  return (
    <section id='user-edit-main'>
      <div className='form-div-container' id='edit-container'>
        <p className='form-p'>Edit User Information</p>
        <form action='#' onSubmit={authenticate}>
          <input type='text' name='first_name' placeholder='First Name' value={inputs.first_name || ''} onChange={handleChange} required/>
          <input type='text' name='last_name' placeholder='Last Name' value={inputs.last_name || ''} onChange={handleChange} required/>
          <input type='text' name='email' placeholder='Email' value={inputs.email || ''} onChange={handleChange} required/>
          <input type='submit' name='submit_button' className='submit_button' value='Save Edits' disabled={true}/>
        </form>
      </div>
    </section>
  )
}