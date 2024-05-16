import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserDetailsForm({ screenName }) {

  //const sN = screenName;

  const postUrl = 'http://localhost:8082/spa/userDetails/save';

  let nav = useNavigate();

  const handlePrevBtnClick = () => {
    nav('/home');
  }

  const initialValue = {
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  }

  const [formData, setFormData] = useState(initialValue)

  const [errors, setErrors] = useState({})

  //const isFormValid = Boolean(formData.firstName && formData.lastName && formData.phoneNumber)


  const validateUDForm = () => {
    let isValid = true;
    const validationErrors = {}

    if (!formData.firstName && !formData.lastName && !formData.phoneNumber) {
      validationErrors.firstName = "First Name, Last Name and Phone Number are required"
      isValid = false
    }else    
    if (!formData.firstName) {
      validationErrors.firstName = "First Name is required"
      isValid = false
    } else 
    if (!formData.lastName) {
      validationErrors.lastName = "Last Name is required"
      isValid = false
    } else
    if (!formData.phoneNumber) {
      validationErrors.phoneNumber = "Phone Number is required"
      isValid = false
    }
    setErrors(validationErrors)
    return isValid;
  }

  // {
  //   "firstName": formData.firstName,
  //   "middleName": formData.middleName,
  //   "lastName": formData.lastName,
  //   "phoneNumber": formData.phoneNumber,
  //   "email": formData.email,
  //   "address": formData.address,
  //   "city": formData.city,
  //   "state": formData.state,
  //   "zipCode": formData.zipCode,
  // }
  const handleSubmitForm = () => {
    // console.log( `${formData.firstName}`)
    const json = JSON.stringify(formData);
    console.log(json)

    axios.post(postUrl, json, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }}).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    alert(`${formData}`)
  }

  const handleURFormInputChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetURForm = (e) => {
    e.preventDefault()
    setErrors('')
    setFormData(initialValue)
  }

  const submitURDetails = (e) => {
    e.preventDefault()
    if (validateUDForm()) {
      alert(`${JSON.stringify(formData, null, ' ')}`)
      handleSubmitForm();
    }

  }

  return (
    <div>

      <h1>User Registration Form</h1>

      <form onSubmit={submitURDetails}>
        <div className="userDetailsForm">
          <div>
            <div>
              <ul>
                <p style={{ color: 'red', alignContent: 'center' }}>{errors.firstName}{errors.lastName}{errors.phoneNumber}</p>
              </ul>
            </div>
            <h3>User Details</h3>
            <input type="text" id="firstName" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleURFormInputChange} />
            <input type="text" id="middleName" placeholder="Middle Name" name="middleName" value={formData.middleName} onChange={handleURFormInputChange} />
            <input type="text" id="lastName" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleURFormInputChange} />
          </div>
          <div>
            <h3>Contact Info</h3>
            <input type="text" placeholder="(123)-567-7890)" name="phoneNumber" value={formData.phoneNumber} onChange={handleURFormInputChange} />
            <input type="text" placeholder="example@email.com" name="email" value={formData.email} onChange={handleURFormInputChange} />
          </div>
          <div>
            <h3>Address Details</h3>
            <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleURFormInputChange} />
            <input type="text" placeholder="City" name="city" value={formData.city} onChange={handleURFormInputChange} />
            <input type="text" placeholder="State" name="state" value={formData.state} onChange={handleURFormInputChange} />
            <input type="text" placeholder="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleURFormInputChange} />
          </div>
        </div>
        <div className="userDetailsForm">
          <button class="button-style" onClick={handlePrevBtnClick}>Previous</button>
          <button class="button-style" type='submit' title=''>Submit</button>
          <button class="button-style" onClick={resetURForm}>Reset</button>
        </div>

      </form>

    </div>
  )
}
