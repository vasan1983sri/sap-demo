import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useTable } from 'react-table'
import * as Constants from '../../utils/App_Constants';
import FeedbackTable from './FeedbackTable';
import { FEEDBACK_COLUMNS } from '../table/TableColumns'
import '../table/table.css'


function extractFeedbackResponse(response, fBdataResponse, setMessages) {
  const data = response.data;
  data.map(x => {
    fBdataResponse.push({
      id: x.id,
      flName: x.flName,
      phoneNumber: x.phoneNumber,
      email: x.email,
      fbMessage: x.fbMessage
    })
  })
  setMessages(fBdataResponse)
}

export default function ManageFeedback() {
  let nav = useNavigate();

  const Feedback_ByName_URL = Constants.Feedback_ByName_URL;
  const ALL_Feedback_URL = Constants.Feedback_GETALL_URL;

  

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
  const [messages, setMessages] = useState([])

  const handleInputChange = (e) => {
    setFbFormData({ ...fbFormData, [e.target.name]: e.target.value })
  }

  const resetURForm = (e) => {
    e.preventDefault()
    setMessages([])
    setFbFormData(initialFBFormValue)
    setErrors({})
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

  const handleAllFeedback = (e) => {
    e.preventDefault()
    const fBDataResponse = []
    setErrors({})
    if (!fbFormData.flName) {
      axios.get(ALL_Feedback_URL).then(
        (response) => {
          extractFeedbackResponse(response, fBDataResponse, setMessages);
        }
      )
    }
   
  }

  const handleFeedbackSearch = (e) => {
    e.preventDefault()
    setMessages([])
    const fBDataResponse = []
    const newErrors = {}
    if (validateFeedbackSearchForm()) {

      axios.get(Feedback_ByName_URL, {
        params: {
          username: fbFormData.flName
        }
      })
        .then((response) => {
          const data = response.data;
          if (response.data.length === 0) {
            newErrors.NoRecord = "No Feedback Exist for user - " + fbFormData.flName
            setErrors(newErrors)
            setFbFormData(initialFBFormValue)
          } else {
            //console.log(data)
            extractFeedbackResponse(response, fBDataResponse, setMessages);
            setFbFormData(initialFBFormValue)
          }
        }
        )
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
            <button class="button-style" type='submit'>Search</button>
            <button class="button-style" onClick={handleAllFeedback} >ALL Feedback</button>
            <button class="button-style" onClick={resetURForm}>Reset</button>
          </div>
          <div>
            {errors.NoRecord && <div className="fb-md-error" >{errors.NoRecord} </div>}
          </div>
        </div>
      </form>
      <FeedbackTable messages={messages}/>
    </div>
  )
}
