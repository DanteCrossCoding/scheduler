import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';


// Appointment Form styling
export default function Form(props) {
  const {onSave, onCancel} = props;

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  // Checks if a student name was entered for the appointment
  function validateName() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    props.onSave(name, interviewer);
    setError('');
  }
  // Checks if an interviewer has been selected for appointment
  function validateInterviewer() {
    if (interviewer === null) {
      setError("Must select an interviewer");
      return
    }
    props.onSave(name, interviewer);
    setError('');
  }
  

  const cancel = () => {
   onCancel(reset());
  }

  const reset = () => {
    setName('');
    setInterviewer(null);
  }

  const save = () => {
    setError('');
    onSave(name, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
            data-testid="student-name-input"
          />
          <section className="appointment_validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={(save, validateName, validateInterviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};