import React from 'react'
import Home from './Home'
import { HashRouter, Route, Routes, NavLink } from 'react-router-dom'
import { Contactus } from './Contactus'
import { Aboutus } from './Aboutus'
import UserDetailsForm from '../body/contents/UserDetailsForm'
import FeedbackForm from '../body/contents/FeedbackForm'
import ManageFeedback from '../body/contents/ManageFeedback'
import FeedbackTable from '../body/contents/FeedbackTable'
import SampleTable from '../body/contents/SampleTable'

export const NavBar = () => {
  return (
    <HashRouter>
      <div>
        <div>
        <div className="Navbarlinksright">
            <NavLink className="Navbarlinksgap" to="/home">Home</NavLink>
            <NavLink className="Navbarlinksgap" to="/contactus">Contactus</NavLink>
            <NavLink className="Navbarlinksgap" to="/aboutus">Aboutus</NavLink>
        </div>
        </div><br />
        <div className="App">
          <Routes >
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/contactus" element={<Contactus />}></Route>
            <Route exact path="/aboutus" element={<Aboutus />}></Route>
            <Route exact path="/userRegistrationForm" element={<UserDetailsForm />} />
            <Route exact path="/feedbackForm" element={<FeedbackForm />} />
            <Route exact path="/manageFeedback" element={<ManageFeedback />} />
            <Route exact path="/sampleTable" element={<SampleTable />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}
