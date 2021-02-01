import { useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";
import Calendar from 'react_google_calendar'

export default function Calendar() {

    const calendar_configuration = {
        api_key: YOUR_GOOGLE_API_KEY,
        calendars: [
          {
            name: 'demo', // whatever you want to name it
            url: 'exampleURL@group.calendar.google.com' // your calendar URL
          }
        ],
        dailyRecurrence: 700,
        weeklyRecurrence: 500,
        monthlyRecurrence: 20
    }

    const[calendar, setCalendar] = useState('');

    return(
        <Container>
            <Calendar
            events={this.state.events}
            config={calendar_configuration} />
        </Container>
    )
}