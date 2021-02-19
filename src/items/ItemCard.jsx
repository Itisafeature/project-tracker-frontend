import React from 'react';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <p>{item.name}</p>
    </div>
  )
}

export default ItemCard;