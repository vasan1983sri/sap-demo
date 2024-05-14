import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as Constants from '../../utils/App_Constants';

export default function ManageFeedback() {
  let nav = useNavigate();
  const Feedback_ByName_URL = Constants.Feedback_ByName_URL;

  const handlePrevBtnClick = () => {
    nav('/home');
  }

  const initialFBFormValue = {
    flName: "",
    email: "",
    phoneNumber: "",
    fbMessage: ""
  }

  const [fbFormData, setFbFormData] = useState(initialFBFormValue)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    setFbFormData({ ...fbFormData, [e.target.name]: e.target.value })
  }

  const resetURForm = (e) => {
    e.preventDefault()
    setFbFormData(initialFBFormValue)
    //setErrors({})
  }

  const validateFeedbackSearchForm = () => {
    let isValid = true
    const newErrors = {}

    if (!fbFormData.flName) {
      newErrors.flName = "Name cannot be Empty!!!"
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }

  const handleFeedbackSearch = (e) => {
    e.preventDefault()
    if (validateFeedbackSearchForm()) {
      const userName = fbFormData.flName;
      axios.get(Feedback_ByName_URL, {
        params: {
         username: userName
        }
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      
    }
  }


  return (
    <div>
      <form onSubmit={handleFeedbackSearch}>
        <h1>Manage Feedback</h1>
        <div>
          <div className="fb-md-container">
          {errors.flName && <div className="fb-md-error" >{errors.flName}</div>}
            <input autoFocus={true} placeholder="Your Name" name="flName" value={fbFormData.flName} onChange={handleInputChange} />
          </div>
          <div>
            <button class="button-style" onClick={handlePrevBtnClick}>Previous</button>
            <button class="button-style" type='submit' >Search</button>
            <button class="button-style" onClick={resetURForm}>Reset</button>
          </div>
        </div>
      </form>
    </div>
  )
}
