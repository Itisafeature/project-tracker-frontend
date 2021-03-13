import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotesNew from '../notes/NotesNew';
import NoteCard from '../notes/NoteCard';

const NotesContainer = ({boardName, item}) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await axios.get(`/items/${item.name}/notes?boardName=${boardName}`)
        setNotes(res.data.notes);
      } catch (err) {
        console.log(err);
      }
    }
    getNotes();
  }, [boardName, item])
  
  const newNoteSubmit = async (data, e) => {
    e.preventDefault();
    try {
      data.note.itemId = item.id;
      const res = await axios.post('/notes', data)
      setNotes([res.data.note].concat(notes))
    } catch (err) {
      console.log(err);
    }
  }

  return (

      <div className="notes">
        {notes.length > 0 ? notes.map((note, index) => <NoteCard key={index} note={note} />) : <h3>Loading Notes</h3>}
        <NotesNew newNoteSubmit={newNoteSubmit} />
      </div>
      
  )

}

export default NotesContainer;