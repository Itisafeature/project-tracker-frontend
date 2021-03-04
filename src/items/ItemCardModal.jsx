import React from 'react';
import '../assets/ItemCardModal.scss'

const ItemCardModal = ({item}) => {
  return (
    <div className="item-card_modal">
    <h1>{item.name}</h1>
  </div>
  )
}

export default ItemCardModal;
