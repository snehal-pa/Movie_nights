import { useEffect, useState, useContext } from "react";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Context } from "../App";
//const { header } = require("../header");

export default function MyCalendar() {
  const [context, updateContext] = useContext(Context);
  const [myEvents, setEvents] = useState([]);
  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    getEvents();
  }, []);

  //fetch events
  function getEvents() {
    
    let events = context.myEvents   
    events.forEach((event) => {
      event.start = convertDate(event.start.dateTime.value);
      event.end = convertDate(event.end.dateTime.value);
      event.title = event.summary;
      setEvents(events);
      console.log(events);
    });
   
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
