import React from 'react'
import Home from './Home'
import { HashRouter, Route, Routes } from 'react-router-dom'

export const NavBar = () => {
  return (

    <HashRouter>
      <div className="Navbarlinksright">
        <ul>
          <a className="Navbarlinks" href="/">Home</a>
          <a className="Navbarlinks" href="/contactus">Contact us</a>{ }
          <a className="Navbarlinks" href="/aboutus">About us</a>
        </ul>
      </div>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </HashRouter>


  )
}
