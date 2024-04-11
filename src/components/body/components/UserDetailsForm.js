import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserDetailsForm() {

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
    address:"",
    city:"",
    state:"",
    zipCode:"",
  }

  const [formData, setFormData] = useState(initialValue)


  console.log(formData)


  const handleFirstNameChange = (e) => {
    e.preventDefault()
    setFormData({...formData, firstName: e.target.value})
  }

  return (
    <div>
      <div className="userDetailsForm">
        <div>
          <h3>User Details</h3>
          <input type="text" id="first_Name" placeholder="First Name" value={formData.firstName} onChange={handleFirstNameChange} />
          <input type="text" id="middle_Name" placeholder="Middle Name" />
          <input type="text" id="last_Name" placeholder="Last Name" />
        </div>
        <div>
          <h3>Contact Info</h3>
          <input type="text" placeholder="(123)-567-7890)" />
          <input type="text" placeholder="example@email.com" />
        </div>
        <div>
          <h3>Address Details</h3>
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
          <input type="text" placeholder="Zip Code" />
        </div>
      </div>
      <div className="userDetailsForm">
        <button class="button-style" onClick={handlePrevBtnClick}>Previous</button>
        <button class="button-style">Submit</button>
        <button class="button-style">Reset</button>
      </div>
    </div>
  )
}
