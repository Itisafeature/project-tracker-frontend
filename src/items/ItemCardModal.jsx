import React from 'react';
import NotesContainer from '../notes/NotesContainer';
import '../assets/ItemCardModal.scss'

const ItemCardModal = ({boardName, item}) => {

  return (
  <div className="item-card_modal">
      <h1>{item.name}</h1>
      <NotesContainer item={item} boardName={boardName} /> 
  </div>
  )
}

export default ItemCardModal;
