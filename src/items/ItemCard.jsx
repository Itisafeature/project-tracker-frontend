import React from 'react';
import '../assets/ItemCard.scss';

const ItemCard = React.forwardRef(({ item, draggableProps, dragHandleProps }, ref) => {
  return (
    <div ref={ref} {...draggableProps} {...dragHandleProps} className="item-card">
      <p>{item.name}</p>
    </div>
  )
})

export default ItemCard;