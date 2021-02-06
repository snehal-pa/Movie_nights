import { useEffect, useState } from "react";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const { header } = require("../header");

export default function MyCalendar() {
  const [myEvents, setEvents] = useState([]);
  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    getEvents();
  }, []);

  //fetch events
  async function getEvents() {
    let events = await (await fetch("/api/myEvents", header)).json();

    if (!events.error) {
      events.forEach((event) => {
        event.start = convertDate(event.start.dateTime.value);
        event.end = convertDate(event.end.dateTime.value);

        setEvents(events);
        console.log(events);
      });
    } else {
      setEvents([]);
    }
  }

  function convertDate(date) {
    return new Date(moment.utc(date).toDate());
  }

  return (
    <Calendar
      localizer={localizer}
      events={myEvents}
      startAccessor="start"
      endAccessor="end"
    />
  );
}
