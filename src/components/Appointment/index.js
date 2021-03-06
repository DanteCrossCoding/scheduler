import React, { useEffect } from 'react';

import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

import useVisualMode from 'hooks/useVisualMode.js';


// props listing appointment pages
export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETE = 'DELETE';
  const CONFIRM = 'CONFIRM';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const EDIT = 'EDIT';
  const { mode, transition } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // saves and transitions from CREATE page to SAVING page
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)

      .then((res) => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };
  
  const deleteInterview = () => {
    transition('DELETE', true);
    props.cancelInterview(props.id)
    .then(response => {
      transition('EMPTY');
    })
    .catch(error => {
      transition('ERROR_DELETE', true);
    })
  }

  //edit appointment transition (to keep styling clean)
  const edit = () => {
    transition(EDIT);
  };
  useEffect(() => {
    props.interview ? transition(SHOW) : transition(EMPTY);
  }, [props.interview]);

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          onEdit={edit}
          onDelete={() => transition(CONFIRM)}
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETE && <Status message="Deleting..." />}
      {mode === ERROR_SAVE && (
        <Error 
          onClose={() => transition(CREATE)} 
          message="Error Saving Data" />
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={() => transition(SHOW)}
          message="Error Deleting Data"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={'Delete the appointment?'}
          onCancel={() => transition(SHOW)}
          onConfirm={deleteInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          onSave={save}
          onCancel={() => transition(SHOW)}
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          onCancel={() => transition(EMPTY)}
          interviewers={props.interviewers}
        />
      )}
    </article>
  );
}