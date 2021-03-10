import React from 'react';
import NoteCard from '../notes/NoteCard';
import '../assets/ItemCardModal.scss'

const ItemCardModal = ({item}) => {
  debugger;
  return (
  <div className="item-card_modal">
      <h1>{item.name}</h1>
      <div className="notes">
        {item.notes && item.notes.map((note, index) => <NoteCard key={index} note={note} />)}
      </div>
  </div>
  )
}

export default ItemCardModal;
