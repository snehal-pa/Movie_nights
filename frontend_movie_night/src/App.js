//import logo from './logo.svg';
import React, { useState, createContext, useEffect } from "react";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
//import'./Main.js';
import Login from "./pages/Login";
import "./sass/style.scss";
import Home from "./pages/Home";
import TopBar from "./components/TopBar";

// create and export the context
export const Context = createContext();

export default function App() {
  const [contextVal, setContext] = useState({
    showCreateInvitation: false,
    loggedInUser: false,
    myEvents: [],
  });

  const updateContext = (updates) =>
    setContext({
      ...contextVal,
      ...updates,
    });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const header = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };

    let res = await fetch("/rest/whoami", header);
    let user = await res.json();

    if (res.status == 404) {
      updateContext({ loggedInUser: false });
      return;
    }
    console.log(user);

    let events = await (await fetch("/api/myEvents", header)).json();
    if (events.error) {
      events = [];
    }
    updateContext({ myEvents: events, loggedInUser: user });
  }

  return (
    <Context.Provider value={[contextVal, updateContext]}>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </Context.Provider>
  );
}
