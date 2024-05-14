import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import * as Constants from '../../utils/App_Constants';

export default function FeedbackForm() {

  let nav = useNavigate();

  const handlePrevBtnClick = () => {
    nav('/home');
  }
  
  const Feedback_SAVE_URL = Constants.Feedback_SAVE_URL;
  
  const initialFBFormValue = {
    flName: "",
    email: "",
    phoneNumber: "",
    fbMessage: ""
  }

  const [fbFormData, setFbFormData] = useState(initialFBFormValue)
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFbFormData({ ...fbFormData, [e.target.name]: e.target.value })
  }

  const resetURForm = (e) => {
    e.preventDefault()
    setFbFormData(initialFBFormValue)
    setErrors({})
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!fbFormData.flName) {
      newErrors.flName = "Name is required"
      //console.log(newErrors.flName)
      isValid = false
    }
    if (!fbFormData.email) {
      newErrors.email = "Email is required"
      isValid = false
    }
    if (!fbFormData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required"
      isValid = false
    }
    if (!fbFormData.fbMessage) {
      newErrors.fbMessage = "Feedback cannot be empty"
      isValid = false
    }else if (fbFormData.fbMessage.length < 25){
      newErrors.fbMessage = "Feedback cannot be less than 25 characters"
      isValid = false
    }
    setErrors(newErrors)
    return isValid;
  }

  const onFBSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const nD = `${JSON.stringify(fbFormData, null, ' ')}`
      console.log("Printing nd --> " + nD)
      alert(`${JSON.stringify(fbFormData, null, ' ')}`)
      console.log(Feedback_SAVE_URL)

      axios.post(Feedback_SAVE_URL, nD, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }}).then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
      
    }
    setFbFormData(initialFBFormValue)
  }

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <div className="feedBackForm">
      <form onSubmit={onFBSubmit}>
        <div className="feedback-container">
          <h1>Feedback Form</h1>
          <div className="fb-ud-container">
            <div>
              {errors.flName && <div className="feedbackError" >{errors.flName}</div>}
              <input autoFocus={true} placeholder="Your Name" name="flName" value={fbFormData.flName} onChange={handleInputChange} />
            </div>
            <div>
              {errors.email && <div className="feedbackError" >{errors.email}</div>}
              <input placeholder="Your Email" name="email" value={fbFormData.email} onChange={handleInputChange} />
            </div>
            <div>
              {errors.phoneNumber && <div className="feedbackError" >{errors.phoneNumber}</div>}
              <input placeholder="Phone Number" name="phoneNumber" value={fbFormData.phoneNumber} onChange={handleInputChange} />
            </div>
          </div>
          <div className="feedback-message">
            {errors.fbMessage && <div className="feedbackError" >{errors.fbMessage}</div>}
            <textarea placeholder="Feedback Message" name="fbMessage" rows={10} value={fbFormData.fbMessage} onChange={handleInputChange} />
          </div>
          <div className="feedback-btn">
            <button class="button-style" onClick={handlePrevBtnClick}>Previous</button>
            <button class="button-style" type='submit'>Submit</button>
            <button class="button-style" onClick={resetURForm} >Clear</button>
          </div>
        </div>
      </form>
    </div>
  )
}
