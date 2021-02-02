import React, { useEffect } from "react";
//import GoogleLogin from "react-google-login";
import { Button } from "reactstrap";

import { Container, Row } from "reactstrap";

const CLIENT_ID =
  "58233015853-ebr03ggbna9ohtlisggmftjsqpnsnsf0.apps.googleusercontent.com";

export default function Login() {
  let auth2;
  let gapi;

  useEffect(() => {
    window.gapi.load("auth2", function () {
      auth2 = window.gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/calendar.events",
      });
    });
    console.log("AUTH2211 ", auth2)
  }, []);

  var request = window.gapi.client.drive.about.get({ 'fields': 'user' });

  // Execute the API request.
  request.execute(function (response) {
    console.log(response);
  });


  // Example 2: Use gapi.client.request(args) function
  var request = gapi.client.request({
    'method': 'GET',
    'path': '/drive/v3/about',
    'params': { 'fields': 'user' }
  });
  // Execute the API request.
  request.execute(function (response) {
    console.log("RESPONSE USER  ",response);
  });



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


      // etc...
    } else {
      // There was an error.
    

    }
  }

    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Button onClick={() => auth2.grantOfflineAccess().then(signInCallback)}>
            Login with Google
        </Button>
        </Row>
      </Container>
    );
  }

