//import logo from './logo.svg';
import React from "react"

import { BrowserRouter as Router, Route } from 'react-router-dom';
//import'./Main.js';
import Login from './components/Login';
import "./sass/style.scss";
import Home from './components/Home';
import TopBar from './components/TopBar';



export default function App() {
  return (    
     <Router>      
       <TopBar/>            
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/home" exact>
        <Home/>
      </Route>      
     </Router>
  );
}



