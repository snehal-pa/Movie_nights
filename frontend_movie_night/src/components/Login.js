import React from "react";
import GoogleLogin from "react-google-login"


import {  
  Container,  
  Row
} from "reactstrap";

const CLIENT_ID = "58233015853-ebr03ggbna9ohtlisggmftjsqpnsnsf0.apps.googleusercontent.com";

export default function Login() {

  const handleLogin = async googleData => {
    const res = await fetch("/storeauthcode", {
        method: "POST",
        body: googleData.tokenId,    
      headers: {
        'Content-Type': 'application/octet-stream; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
      },      
    })
    const data = await res.json()
    // store returned user somehow
  }
   

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
  )

}