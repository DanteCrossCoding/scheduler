import React, {  useEffect } from 'react';
import axios from 'axios';
import 'components/Application.scss';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment/index.js';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewers,
} from 'helpers/selectors';

import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {
  const {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
  let dayAppt = [];

  //collects data form database
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  
// generates appointment data from database
  dayAppt = getAppointmentsForDay(state, state.day);
  const appointments = dayAppt.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewers(state, 'Monday');
    return (
      <Appointment
        mode={state.mode}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });
// Sidebar styling
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key={'last'} time={'5pm'} />
      </section>
    </main>
  )};