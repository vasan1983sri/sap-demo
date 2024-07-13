import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as Constants from '../../utils/App_Constants';
import FeedbackTable from './FeedbackTable';
import '../table/table.css'


function extractFeedbackResponse(response, fBdataResponse, setMessages, setPIndex) {
  const data = response.data;
  if (data.length > 0) {
    data.map(x => {
      fBdataResponse.push({
        id: x.id,
        flName: x.flName,
        phoneNumber: x.phoneNumber,
        email: x.email,
        fbMessage: x.fbMessage,
        createdOn: x.updt_ts,
      })
    })
    setMessages(fBdataResponse)
    setPIndex(1)
  }
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
    fbMessage: "",
    updt_ts: "",
  }


  const [fbFormData, setFbFormData] = useState(initialFBFormValue)
  const [errors, setErrors] = useState({})
  const [messages, setMessages] = useState([])
  const [pIndex, setPIndex] = useState(0)
  const [selectFBMessage, setSelectFBMessage] = useState()

  const handleInputChange = (e) => {
    setFbFormData({ ...fbFormData, [e.target.name]: e.target.value })
  }

  const resetURForm = (e) => {
    e.preventDefault()
    setMessages([])
    setFbFormData(initialFBFormValue)
    setPIndex(0)
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
          extractFeedbackResponse(response, fBDataResponse, setMessages, setPIndex);
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
            extractFeedbackResponse(response, fBDataResponse, setMessages, setPIndex);
            setFbFormData(initialFBFormValue)
          }
        }
        )
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  
  console.log(selectFBMessage)
  return (
    <>
      <div>
        <form onSubmit={handleFeedbackSearch}>
          <h2>Manage Feedback</h2>
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
        <FeedbackTable messages={messages} pageInitialValue={pIndex} setSelectFBMessage={setSelectFBMessage} />
      </div>
      
    </>
  )
}
