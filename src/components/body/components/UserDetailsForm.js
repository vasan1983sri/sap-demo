import React from 'react'

export default function UserDetailsForm() {
  return (
    <div>
        <div>
            <div> 
            <h1>User Details</h1>
              <input type="text" id="first_Name" placeholder="First Name" style={{marginRight: "8px"}} />
              <input type="text" id="middle_Name" placeholder="Middle Name" style={{marginRight: "8px"}} />
              <input type="text" id="last_Name" placeholder="Last Name" style={{marginRight: "8px"}} />
            </div>
            <div>
            <h1>Contact Info</h1>
            <input type="text" placeholder="(123)-567-7890)" />
              <input type="text" placeholder="example@email.com" />
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="City" />
              <input type="text" placeholder="State" />
              <input type="text" placeholder="Zip Code" />
            </div>
        </div>
    </div>
  )
}
