import React, { useEffect, useContext } from "react";
//import GoogleLogin from "react-google-login";
import { Container, Row, Button } from "reactstrap";
import { Context } from "../App";

const CLIENT_ID =
  "58233015853-ebr03ggbna9ohtlisggmftjsqpnsnsf0.apps.googleusercontent.com";

export default function Login(props) {
  const [context, updateContext] = useContext(Context);
  //let auth2;
  //let gapi;

  useEffect(() => {
    // window.gapi.load("auth2", function () {
    //   auth2 = window.gapi.auth2.init({
    //     client_id: CLIENT_ID,
    //     scope: "https://www.googleapis.com/auth/calendar",
    //   });
    // });
    // console.log("auth2:");
    // console.log(auth2);
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

      /*if (result.status == 200) {
        //console.log(result.status);
        var auth2 = window.gapi.auth2.getAuthInstance();
        var profile = auth2.currentUser.get().getBasicProfile();
        console.log(profile);
        console.log(profile.getName());
        console.log(profile.getEmail());

        updateContext({
          loggedInUser: { name: profile.getName(), email: profile.getEmail() },
        });
      }*/

      // etc...
    } else {
      // There was an error.
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Button
          onClick={() => props.auth2.grantOfflineAccess().then(signInCallback)}
        >
          Login with Google
        </Button>
      </Row>
    </Container>
  );
}
