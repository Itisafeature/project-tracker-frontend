import React from 'react';

const NoteCard = (note) => {
  return (
    <textarea readOnly value={note.content}></textarea>
  )
}

export default NoteCard;