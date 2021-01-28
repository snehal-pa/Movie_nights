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



