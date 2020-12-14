import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const interviewerListItem = props.interviewers.map((interviewers, index) => {
  return (
  <InterviewerListItem 
  key={interviewers.id} 
  name={interviewers.name} 
  avatar={interviewers.avatar} 
  selected={interviewers.id === props.interviewer} 
  setInterviewer={(event) => props.onChange(interviewers.id)}/>) 
})

return (
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewerListItem}</ul>
</section>
)
}
