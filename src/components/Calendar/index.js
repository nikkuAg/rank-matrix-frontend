import React, { useState } from 'react';
import { impDates } from '../../constants/dashboard'
import Calendar from 'react-calendar';
import moment from 'moment'
import "./index.scss";

export default function Events({ change,yearChange,dateChange }) {
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [date, setDate] = useState(null);

  const handleDate = (e) => {
    if (date == null || e.getTime() != date.getTime()) {
      setDate(e)
      dateChange(e)
    }
    else if (e.getTime() == date.getTime()) {
      e = null;
      setDate(e)
      dateChange(e)
    }
  }

  return (
    <Calendar
      onChange={handleDate}
      showNeighboringMonth={false}
      tileClassName={({ date, view }) => {
        setMonth(date.getMonth() + 1)
        setYear(date.getFullYear())
        change(month);
        yearChange(year);
        if (impDates.find(x => x.startDate === moment(date).format("YYYY-MM-DD"))) {
          return 'highlight'
        }
      }}
    />
  );
}
