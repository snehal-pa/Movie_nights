//import logo from './logo.svg';
import React, { useState, createContext, useEffect } from "react";

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
    whoamI();
  });

  const whoamI = async () => {
    let res = await fetch("/rest/whoami");
    let user = await res.json();

    if (res.status == 404) {
      updateContext({ loggedInUser: false });
      return;
    }
    updateContext({ loggedInUser: user });
  };

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
