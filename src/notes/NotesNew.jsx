import React from 'react';
import { useForm } from 'react-hook-form';


const NotesNew = ({ newNoteSubmit }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, e) => {
    newNoteSubmit(data, e);
  }

  return (
    <div className="add-note">
      <form className="new-note-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="new-note-content">Note Content</label>
        <textarea
              cols="30"
              rows="6"
              className="item-notes"
              id="new-note-content"
              name="note[content]"
              ref={register({ required: "Content Required"})}
            />
        <button type="submit">Add Note</button>
      </form>
    </div>
  )
}

export default NotesNew;