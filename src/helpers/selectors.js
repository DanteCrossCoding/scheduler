const getAppointmentsForDay = (state, day) => {
  const apptArr = state.days.filter((days) => days.name === day);
  let daysApts = [];
  if (apptArr.length > 0) {
    for (let apt of apptArr[0].appointments) {
      daysApts.push(state.appointments[apt]);
    }
    return daysApts;
  }
  return [];
};

const getInterview = function (state, interview) {
  if (interview !== null) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }
  return null;
}

const getInterviewers = (state, day) => {
  const apptArr = state.days.filter((days) => days.name === day);
  let interviewers = [];
  if (apptArr.length > 0) {
    for (let item of apptArr[0].interviewers) {
      interviewers.push(state.interviewers[item]);
    }
    return interviewers;
  }
  return [];
};
export { getAppointmentsForDay, getInterview, getInterviewers };