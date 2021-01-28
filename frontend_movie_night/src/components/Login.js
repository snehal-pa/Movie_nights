import React from "react";
import GoogleLogin from "react-google-login";

import { Button, Container, Row } from "reactstrap";

export default function Login() {
  let auth2;
  const CLIENT_ID =
    "58233015853-ebr03ggbna9ohtlisggmftjsqpnsnsf0.apps.googleusercontent.com";

  async function handleLogin(e) {
    e.preventDefault();
    start();

    auth2.grantOfflineAccess().then(signInCallback);
  }

  async function signInCallback(authResult) {
    if (authResult["code"]) {
      try {
        let result = await fetch("/api/storeauthcode", {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream; charset=utf-8",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: authResult["code"],
        });
      } catch (e) {
        return e;
      }
    }
  }

  function start() {
    gapi.load("auth2", function () {
      auth2 = gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/calendar.events",
      });
    });
  }

  /*const handleLogin = async (googleData) => {
    const res = await fetch("/storeauthcode", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // store returned user somehow
  };*/

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
        />
      </Row>
    </Container>
  );
}
