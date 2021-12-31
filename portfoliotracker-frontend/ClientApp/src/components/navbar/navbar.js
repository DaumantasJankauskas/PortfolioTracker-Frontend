import React from 'react';

import './navbar.css'

function Navbare () {

  return (
    <section className="navbar">
      <a href="/" className="navbar-item">Home</a>
      <a href="/about" className="navbar-item">About</a>
      <a href="/Register" className="navbar-item">Register</a>
      <a href="/Login" className="navbar-item">Login</a>
  </section>
  )

}

export default Navbare;