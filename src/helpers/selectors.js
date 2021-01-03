
//generates appointment list for selected day
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

//generates interview data for selected interview
const getInterview = function (state, interview) {
  if (interview !== null) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }
  return null;
}

//generates list of available interviewers
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