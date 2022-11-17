import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr/>

        <switch>
          <Routes>
            <Route path="/" element={<Hom/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </switch>
      </div>
    </Router>
  )
}

function Hom() {
  return (
    <div>
      <h2>Home!</h2>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard!!</h2>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About!!!</h2>
    </div>
  )
}

export default App;
