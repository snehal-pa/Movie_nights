//import logo from './logo.svg';
import React from "react"
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import'./Main.js';
import Login from './components/Login';
import "./sass/style.scss";


export default function App() {
  return (
    <Router>
    <Container>
      
      <Route path="/" exact>
        <Login />
      </Route>
    </Container>
  </Router>
  );
}

/*function App() {
  return (
    <div className="App">
      <header>
    
      </header>

    <script src="https://apis.google.com/js/client:platform.js?onload=start" async defer></script>
      <script src="/main.js" defer></script>
    <button id="signinButton">Link my Google Calendar</button>
   
    </div>
  );
}*/

