import React,{useState} from 'react';
import { DateValue,ImpDates } from './constants';
import Calendar from 'react-calendar';
import "./index.scss";
export default function Events() {
  const [value, setValue] = useState(new Date());

  return (
          <Calendar 
          tileClassName={({date,view})=>{
            let day=date.getDate()
            let month=date.getMonth()+1
            if (date.getMonth()<10){
              month='0'+month;
            }
            if (date.getDate()<10){
              day='0'+day;
            }
            const realDate=day+'-'+month+'-'+date.getFullYear()
            if(DateValue.find(val=>val===realDate)){ 
              return 'highlight'
            }
          }}/>
  );
}