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
        <Link to="/userRegistrationForm" className="btn btn-primary">User Details Form</Link>
      </ul>
      <div>
        <h1>Smaple H1</h1>
        <button onClick={handleUserForm}>Sample</button>
      </div>
      
     </div>
      </div>
  )
}
