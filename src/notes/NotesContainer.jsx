import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotesNew from '../notes/NotesNew';

const NotesContainer = ({boardName, item}) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    debugger;
    const getNotes = async () => {
      try {
        const res = await axios.get(`/items/${item.name}/notes?boardName=${boardName}`)
      } catch (err) {
        console.log(err);
      }
    }

  }, [item])
  
  const onSubmit = async (data, e) => {
    e.preventDefault();
  }

  return (

      <div className="notes">
        {/* {notes.map((note, index) => <NoteCard key={index} note={note} />)} */}
        <NotesNew onSubmit={onSubmit} />
      </div>
      
  )

}

export default NotesContainer;