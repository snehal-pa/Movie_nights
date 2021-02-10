import React, { useState, useEffect, useContext } from "react";
//import GoogleLogin from "react-google-login";
import { Button, CardTitle } from "reactstrap";
import { Context } from "../App";
import { Container, Row, CardBody, CardText, Card } from "reactstrap";
//const { header } = require("./header");
import { useHistory } from "react-router-dom";

const CLIENT_ID =
  "58233015853-ebr03ggbna9ohtlisggmftjsqpnsnsf0.apps.googleusercontent.com";

export default function Login() {
  const [auth2, setAuth2] = useState(null);
  const [context, updateContext] = useContext(Context);
  const history = useHistory();

  const whoamI = async () => {
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

    updateContext({ loggedInUser: user });
  };

  useEffect(() => {
    window.gapi.load("auth2", function () {
      setAuth2(
        window.gapi.auth2.init({
          client_id: CLIENT_ID,
          scope: "https://www.googleapis.com/auth/calendar",
          fetch_basic_profile: true,
        })
      );
    });
  }, []);

  async function getEvents() {
    const header = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };
    let events = await (await fetch("/api/myEvents", header)).json();
    if (events.error) {
      events = [];
    }
    console.log("events from login", events);

    updateContext({ myEvents: events });
  }

  async function signInCallback(authResult) {
    if (authResult["code"]) {
      // Send the code to the server
      let result = await fetch("/api/storeauthcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream; charset=utf-8",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: authResult["code"],
      });

      const data = await result.json();

      if (result.status == 200) {
        //console.log(data);
        localStorage.setItem("jwtToken", data.jwt);

        const header = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        };
        let res = await fetch("/rest/whoami", header);
        let user = await res.json();
        if (res.status == 404) {
          updateContext({ loggedInUser: false });
          return;
        }
        let events = await (await fetch("/api/myEvents", header)).json();
        if (events.error) {
          events = [];
        }

        updateContext({
          loggedInUser: user,
          myEvents: events,
        });
        console.log("from login context events", context.myEvents);

        //whoamI();
        //getEvents();
        history.push("/home");
      }
    } else {
    }
  }

  return (
    <Container fluid className="login-background">
      <Row className="d-flex justify-content-center">
        <Card className="login-card text-center mt-5">
          <CardBody>
            <CardTitle className="card-title" tag="h3">
              <strong className="login-text">LOGIN TO</strong> MOVIE NIGHTS
            </CardTitle>
            <CardText className="text-muted" tag="h6">
              to get access to thousands of movies to watch with your friends{" "}
            </CardText>
            <Button
              className="login-button mt-3"
              onClick={() => auth2.grantOfflineAccess().then(signInCallback)}
            >
              <img
                className="icon-button"
                src="http://pngimg.com/uploads/google/google_PNG19635.png"
              ></img>
              Sign in with Google
            </Button>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
}
