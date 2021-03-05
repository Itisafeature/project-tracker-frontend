import React from 'react';
// import NoteCard from '../notes/NoteCard';
import '../assets/ItemCardModal.scss'

const ItemCardModal = ({item}) => {
  return (
  <div className="item-card_modal">
      <h1>{item.name}</h1>
      <textarea readOnly>{item.notes}</textarea>
  </div>
  )
}

export default ItemCardModal;