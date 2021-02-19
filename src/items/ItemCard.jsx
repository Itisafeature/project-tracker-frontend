import React from 'react';
import '../assets/ItemCard.scss';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <p>{item.name}</p>
    </div>
  )
}

export default ItemCard;