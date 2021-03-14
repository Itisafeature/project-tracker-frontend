import React from 'react';
import '../assets/NoteCard.scss';

const NoteCard = ({note}) => {
  return (
    <textarea className="note_content" readOnly value={note.content}></textarea>
  )
}

export default NoteCard;