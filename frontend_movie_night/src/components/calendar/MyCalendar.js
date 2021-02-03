import { useEffect, useState } from "react";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function MyCalendar() {
  const [myEvents, setEvents] = useState([]);
  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    getEvents();
  }, []);

  //fetch events
  async function getEvents() {
    let events = await await (
      await fetch("http://localhost:8080/api/myEvents")
    ).json();
    console.log("my calendar");
    console.log(events);

    if (!events.error) {
      events.forEach((event) => {
        event.start = convertDate(event.start.dateTime.value);
        event.end = convertDate(event.end.dateTime.value);

        setEvents(events);
      });
    } else {
      setEvents("error");
    }
  }

  function convertDate(date) {
    return new Date(moment.utc(date).toDate());
  }

  return (
    <>
      {myEvents === "error" ? (
        <h5 className="text-center"> You have to login to see your events</h5>
      ) : (
        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
        />
      )}
    </>
  );
}
