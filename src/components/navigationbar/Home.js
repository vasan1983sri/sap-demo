import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

export default function Home() {

  let nav = useNavigate();

  const handleUserForm = () => {
    nav('/userRegistrationForm')
  }
  return (
    <div>
     {/* <h1>Home Page</h1> */}
     <div>
      <ul className="listAlignment">
        <Link to="/userRegistrationForm" className="listAlignment">User Details Form</Link>
        <Link  className="listAlignment">User Details Form1</Link>
      </ul>
      {/* <button class="button-style">User Form</button>
      <button class="button-style">User Form 1</button> */}
      <div>
        <button class="button-style" onClick={handleUserForm}>User Registration</button>
       
      </div>
     </div>
      </div>
  )
}
