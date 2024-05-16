import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {

  let nav = useNavigate();

  const handleUserRegistrationForm = () => {
    nav('/userRegistrationForm')
  }

  const handleUserFeedbackForm = () => {
    nav('/feedbackForm')
  }

  const handleManageFeedbackForm = () => {
    nav('/managefeedback')
  }
  return (
    <div>
     {/* <h1>Home Page</h1> */}
     <div>
      <ul className="listAlignment">
        <Link to="/userRegistrationForm" className="listAlignment">User Details Form</Link>
        <Link to="/feedbackForm" className="listAlignment">Feedback Form</Link>
        <Link to="/managefeedback" className="listAlignment">Manage Feedback</Link>
      </ul>
      {/* <button class="button-style">User Form</button>
      <button class="button-style">User Form 1</button> */}
      <div>
        <button class="button-style" onClick={handleUserRegistrationForm}>User Registration</button>
        <button class="button-style" onClick={handleUserFeedbackForm}>Feedback</button>
        <button class="button-style" onClick={handleManageFeedbackForm}>Manage Feedback</button>        
      </div>
     </div>
      </div>
  )
}
