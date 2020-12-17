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
import useApplicationData from 'hooks/useApplicationData.js'

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
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const {bookInterview, cancelInterview } = useApplicationData

  const deleteInterview = () => {
    // transition(DELETE, true)
    props.cancelInterview(props.id, props)
      .then((res) => {
        transition(EMPTY)
      })
      // .catch((error) => {
      //   transition(ERROR_DELETE, true);
      // })
  }

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
        <Error onClose={() => back(EMPTY)} message="Error Saving Data" />
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
          onCancel={back}
          onConfirm={props.cancelInterview(props.id)}
          transition={transition}
        />
      )}
      {mode === EDIT && (
        <Form
          onSave={save}
          onCancel={() => back(EMPTY)}
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          onCancel={() => back(EMPTY)}
          interviewers={props.interviewers}
        />
      )}
    </article>
  );
}