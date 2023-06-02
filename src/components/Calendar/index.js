import React,{useState} from 'react';
import {impDates} from '../../containers/Dashboard/constants'
import Calendar from 'react-calendar';
import moment from 'moment'
import "./index.scss";

export default function Events({change,dateChange}) {
  const [value, setValue] = useState();
  const [date,setDate]=useState(null);

  const handleDate=(e)=>{
      setDate(e)
      dateChange(date)
  }

  return (
    <Calendar 
      onChange={handleDate}
      showNeighboringMonth={false}
      tileClassName={({date,view})=>{
        setValue(date.getMonth()+1)
        change(value);
        if(impDates.find(x=>x.startDate===moment(date).format("YYYY-MM-DD"))){ 
          return 'highlight'
        }
      }}
    />
  );
}