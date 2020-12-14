import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: 'Tuesday',
    days: [],
    appointments: {
      1: {
        id: 1,
        time: '12pm',
        interview: null,
      },
    },
    interviewers: {},
  });

  const dayId = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const day = dayId[state.day];

    const daysVar = [...state.days];
    daysVar[day].spots--;
    const URL = `http://localhost:8001/api/appointments/${id}`;
    const promise = axios.put(URL, appointment)
                      .then((response) => {
      setState({
        ...state,
        appointments,
        days: daysVar,
      });
    });

    return promise;
  };

  const cancelInterview = (id) => {
    const day = dayId[state.day];

    const daysVar = [...state.days];
    daysVar[day].spots++;
    const URL = `http://localhost:8001/api/appointments/${id}`;
    return axios.delete(URL)
             .then((response) => {
                const appointment = { ...state.appointments[id], interview: null };
                const appointments = { ...state.appointments, [id]: appointment };
      setState({
        ...state,
        appointments,
        days: daysVar,
      });
    });
  };

  const setDay = (day) => setState({ ...state, day });
  return { state, setState, setDay, bookInterview, cancelInterview };
}