import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem({name, spots, setDay, selected}) {
  const dayClass = classNames ("day-list__item",{
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  if(spots === 0) {
    spots = 'no spots remaining';
  }
  if(spots === 1) {
    spots = '1 spot remaining';
  }
  if(spots > 1) {
    spots += ' spots remaining';
  }
    

  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots}</h3>
    </li>
  );
  }