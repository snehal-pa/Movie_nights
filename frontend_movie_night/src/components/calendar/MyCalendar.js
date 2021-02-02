import { useEffect, useState } from "react";
import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";


export default function MyCalendar() {

    const [myEvents, setEvents] = useState([]);
    moment.locale("en-GB");
    const localizer = momentLocalizer(moment)

    useEffect(() => {
        getEvents();
    
    }, []);

    //fetch events
    async function getEvents() {
        let events = await (await (await fetch("http://localhost:8080/api/myEvents")).json());
        console.log("EVENTS unchanged time  ", events)

        if (!events.error) {
            events.forEach(event => {
                event.start = convertDate(event.start)
                event.end = convertDate(event.end)

                setEvents(events);
                console.log("MY SWEET EVENTS ", events)
            })

        } else {
            console.log("error noo events ")
            myEvents = [];
        }
    }

    function convertDate(date) {
        console.log("DATE ", date)
        let newDate = moment.utc(date).toDate()
        console.log("NEW DATE ", newDate)
        return newDate
    }


        return (
            <Calendar
                localizer={localizer}
                events={myEvents}
                startAccessor="start"
                endAccessor="end"
            />
        )
    
    }

  

