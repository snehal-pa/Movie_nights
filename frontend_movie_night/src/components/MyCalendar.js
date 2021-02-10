import { useEffect, useState, useContext } from "react";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Context } from "../App";
//const { header } = require("../header");

export default function MyCalendar() {
  const [context, updateContext] = useContext(Context); 
  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);
  

  function convertDate(date) {
    return new Date(moment.utc(date).toDate());
  }

  return (
    <Calendar
      localizer={localizer}
      events={context.myEvents.map((event) => ({
        start : convertDate(event.start.dateTime.value),
        end : convertDate(event.end.dateTime.value),
        title : event.summary
      }))}
      startAccessor="start"
      endAccessor="end"
    />
  );
}
