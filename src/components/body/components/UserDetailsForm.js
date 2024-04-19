import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserDetailsForm({ screenName }) {

  const sN = screenName;

  console.log({ screenName })

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

  const isFormValid = Boolean(formData.firstName && formData.lastName && formData.phoneNumber)


  const handleURFormInputChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetURForm = (e) => {
    e.preventDefault()
    setFormData(initialValue)
  }

  const submitURDetails = (e) => {
    //alert(`${JSON.stringify(formData, null, ' ')}`)
     const validationErrors = {}
    // alert(`"First Name: "  ${formData.firstName}`)
    // if (!formData.firstName.trim() || formData.firstName === '') {
    //   validationErrors.firstName = "Name is required"
    // }
    // setErrors(validationErrors)

    // if(isFormValid)
    // {
    //   alert("Form Submitted Successfully")
    // }
    alert(`${isFormValid}`)
    
    if(!isFormValid)
    {
      e.preventDefault()
      if(!formData.firstName && !formData.lastName && !formData.phoneNumber)
      {
        validationErrors.firstName = "First Name,  Last Name and Phone Number are required"
      } else if(!formData.firstName)
      {
        validationErrors.firstName = "First Name is required"
      } else if(!formData.lastName)
      {
        validationErrors.firstName = "Last Name is required"
      } else if(!formData.phoneNumber){
        validationErrors.phoneNumber = "Phone Number is required"
      }      
      setErrors(validationErrors)
      return false;
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
                <p style={{color: 'red', alignContent: 'center'}}>{errors.firstName}</p>
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
