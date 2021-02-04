import React, { useEffect } from "react";
//import GoogleLogin from "react-google-login";
import { Button, CardTitle } from "reactstrap";

import { Container, Row, Col, CardBody, CardText,  Card, } from "reactstrap";

const CLIENT_ID =
  "58233015853-ebr03ggbna9ohtlisggmftjsqpnsnsf0.apps.googleusercontent.com";

export default function Login() {
  let auth2;

  useEffect(() => {
    window.gapi.load("auth2", function () {
      auth2 = window.gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/calendar",
      });
    });
  }, []);

  async function signInCallback(authResult) {
    if (authResult["code"]) {
      // Send the code to the server
      let result = await fetch("http://localhost:8080/api/storeauthcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream; charset=utf-8",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: authResult["code"],
      });

      if (result.status == 200) {
        //console.log(result.status);
        var auth2 = window.gapi.auth2.getAuthInstance();
        var profile = auth2.currentUser.get().getBasicProfile();
        console.log(profile);
        console.log(profile.getName());
        console.log(profile.getEmail());
      }

      // etc...
    } else {
      // There was an error.
    }
  }

  return (
    <Container fluid className="login-background">
  
      <Row className="d-flex justify-content-center">
        <Card className="login-card text-center mt-5">
          <CardBody>
            <CardTitle className="card-title" tag="h3"><strong className="login-text">LOGIN TO</strong> MOVIE NIGHTS</CardTitle>
            <CardText className="text-muted" tag="h6">to get access to thousands of  movies to watch with your friends </CardText>
            <Button  className="login-button mt-3" onClick={() => auth2.grantOfflineAccess().then(signInCallback)}>
            <img className="icon-button" src="http://pngimg.com/uploads/google/google_PNG19635.png"></img>
          Sign in with Google
          </Button>
        </CardBody>
        </Card> 
      </Row>
    </Container>
  );
}
