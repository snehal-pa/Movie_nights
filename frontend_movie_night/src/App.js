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
const CLIENT_ID =
  "58233015853-ebr03ggbna9ohtlisggmftjsqpnsnsf0.apps.googleusercontent.com";

export default function App() {
  const [contextVal, setContext] = useState({
    showCreateInvitation: false,
    loggedInUser: false,
  });

  const [auth2, setAuth2] = useState(null);

  const updateContext = (updates) =>
    setContext({
      ...contextVal,
      ...updates,
    });

  useEffect(() => {
    window.gapi.load("auth2", function () {
      setAuth2(
        window.gapi.auth2.init({
          client_id: CLIENT_ID,
          scope: "https://www.googleapis.com/auth/calendar",
        })
      );
    });

    console.log("auth2:");
    console.log(auth2);
  }, []);

  useEffect(() => {
    getLoggedInUser();
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
          <Login auth2={auth2} />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
      </Router>
    </Context.Provider>
  );
}
