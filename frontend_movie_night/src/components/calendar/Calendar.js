import { useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";

export default function Calendar() {
    const gapi = window.gapi
    const CLIENT_ID = '58233015853-ebr03ggbna9ohtlisggmftjsqpnsnsf0.apps.googleusercontent.com'
    const api_key = 'epO2LkWCorV4xVCC7YsVjRv-'
    //const calendar = google.calendar({version: 'v3', auth});

    //const oAuth2Client = new OAuth2(client_id, client_secret)

    //const calendar = google.calendar({version: 'v3', oAuth2Client});

    //console.log(oAuth2Client)
    let auth2;
    useEffect(() => {
        window.gapi.client.load('calendar', 'v3', function () {
          auth2 = window.gapi.auth2.init({
            client_id: CLIENT_ID,
            scope: "https://www.googleapis.com/auth/calendar",
            listupComingEvents
            
          });
        
        });
     
      },[]);

      function listupComingEvents(){
          var request = gapi.client.calendar.events.list({
              'calendarId' : 'primary',
              'SingleEvents' : 'true'
              
          });

          request.execute(function(resp){
              var events = resp.items
              console.log('the events' + events)
              for( let i = 0; i < events.length; i++){
                  let event = events[i];
                  console.log(event)
                  console.log('showing events' + event)
              }
          })

      }

    return(
        <Container>
            <div>
                here is the calender
            </div>

        </Container>
    )
}