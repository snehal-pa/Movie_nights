//import logo from './logo.svg';
import React, { useState, useEffect, createContext } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
//import'./Main.js';
import Login from "./components/Login";
import "./sass/style.scss";
import Home from "./components/Home";
import TopBar from "./components/TopBar";

// create and export the context
export const Context = createContext();

export default function App() {
  const [contextVal, setContext] = useState({
    showCreateInvitation: false,
    loggedInUser: false,
  });

  const updateContext = (updates) =>
    setContext({
      ...contextVal,
      ...updates,
    });

  useEffect(() => {
    //getLoggedInUser();
  }, []);

  async function getLoggedInUser() {
    let result = await fetch("http://localhost:8080/api/whoami");
    let user = await result.json();
    if (result.status == 404) {
      updateContext({ loggedInUser: false });
      return;
    }
    console.log(user);
    updateContext({ loggedInUser: user });
  }

  return (
    <Context.Provider value={[contextVal, updateContext]}>
      <Router>
        <TopBar />
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
      </Router>
    </Context.Provider>
  );
}
