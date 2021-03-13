import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import NoteCard from '../notes/NoteCard';
import '../assets/ItemCardModal.scss'

const ItemCardModal = ({item}) => {
  const [notes, setNotes] = useState([]);
  const  {register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    setNotes(item.notes.sort((note1, note2) => note1.createdAt - note2.createdAt));
  }, [item.notes])

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      data.note.itemId = item.id;
      const res = await axios.post('/notes', data);
      setNotes([res.data.note].concat(notes));
      reset(data.note)
    } catch (err) {
      console.log(err)
    }
  } 
  return (
  <div className="item-card_modal">
      <h1>{item.name}</h1>
      <div className="notes">
        {notes && notes.map((note, index) => <NoteCard key={index} note={note} />)}
      </div>
      <div className="add-note">
        <form className="new-note-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="new-note-content">Note Content</label>
          <textarea
                cols="30"
                rows="6"
                className="item-notes"
                id="new-note-content"
                name="note[content]"
                ref={register()}
              />
          <button type="submit">Add Note</button>
        </form>
      </div>
  </div>
  )
}

export default ItemCardModal;
