import React from 'react'
import Home from './Home'
import { HashRouter, Route, Routes, NavLink } from 'react-router-dom'
import { Contactus } from './Contactus'
import { Aboutus } from './Aboutus'

export const NavBar = () => {
  return (

    <HashRouter>
      <div className="App">
        <div>
        <div className="Navbarlinksright">
            <NavLink className="Navbarlinksgap" to="/home">Home</NavLink>
            <NavLink className="Navbarlinksgap" to="/contactus">Contactus</NavLink>
            <NavLink className="Navbarlinksgap" to="/aboutus">Aboutus</NavLink>
        </div>
        </div><br />
        <div>
          <Routes >
            <Route  exact path="/home" element={<Home />}></Route>
            <Route exact path="/contactus" element={<Contactus />}></Route>
            <Route exact path="/aboutus" element={<Aboutus />}></Route>
          </Routes>
        </div>
      </div>
    </HashRouter>


  )
}
