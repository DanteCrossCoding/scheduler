import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss"

//Interviewer data assigning
export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
  return (
  <InterviewerListItem 
  key={interviewer.id} 
  name={interviewer.name} 
  avatar={interviewer.avatar} 
  selected={props.value === interviewer.id} 
  setInterviewer={(event) => props.onChange(interviewer.id)}/>) 
})

return (
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>
 );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};