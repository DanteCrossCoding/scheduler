import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList({days, day, setDay}) {

  const dayListItem = days.map((days, index) => {
    return <DayListItem key={index} name={days.name} spots={days.spots} setDay={setDay} selected={days.name === day}/>
  })

  return (
  <ul>
    {dayListItem}
  </ul>
  )
}
