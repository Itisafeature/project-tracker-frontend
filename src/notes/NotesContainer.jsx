import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotesNew from '../notes/NotesNew';
import NoteCard from '../notes/NoteCard';
import '../assets/NotesContainer.scss';

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
    if (item) getNotes();
    
  }, [boardName, item])
  
  const newNoteSubmit = async (data, e) => {
    e.preventDefault();
    try {
      data.note.itemId = item.id;
      const res = await axios.post('/notes', data)
      setNotes([res.data.note].concat(notes))
      return res.data.note;
    } catch (err) {
      console.log(err);
    }
  }

  return (
      <div className="notes-container">
        <div className="notes-list">
          {notes.length > 0 ? notes.map((note, index) => <NoteCard key={index} note={note} />) : <h3>Loading Notes</h3>}
          
        </div>
        <NotesNew newNoteSubmit={newNoteSubmit} />
      </div>
  )

}

export default NotesContainer;