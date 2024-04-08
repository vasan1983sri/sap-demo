import React from 'react'

export default function UserDetailsForm() {

  return (
    <div>
      <div className="userDetailsForm">
        <div>
          <h3>User Details</h3>
          <input type="text" id="first_Name" placeholder="First Name" />
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
        <button class="button-style">Previous</button>
        <button class="button-style">Submit</button>
        <button class="button-style">Reset</button>
      </div>
    </div>
  )
}
