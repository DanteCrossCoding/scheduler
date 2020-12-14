const getAppointmentsForDay = (state, day) => {
  const sortAppt = state.days.filter((days) => days.name === day);
  let apptArr = [];
  if (sortAppt.length > 0) {
    for (let apt of sortAppt[0].appointments) {
      apptArr.push(state.appointments[apt]);
    }
    return apptArr;
  }
  return [];
};

const getInterview = (state, interview) => {
  if (interview) {
    let object = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
    return object;
  } else {
    return null;
  }
};

const getInterviewers = (state, day) => {
  const sortAppt = state.days.filter((days) => days.name === day);
  let interviewersArr = [];
  if (sortAppt.length > 0) {
    for (let item of sortAppt[0].interviewers) {
      interviewersArr.push(state.interviewers[item]);
    }
    return interviewersArr;
  }
  return [];
};
export { getAppointmentsForDay, getInterview, getInterviewers };