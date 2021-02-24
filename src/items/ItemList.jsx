import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { titleize } from '../helpers/helpers';
import ItemCard from './ItemCard';


const ItemList = ({items, type}) => (
  <Droppable droppableId="type">
    {(provided) => (
      <div className={`${type}-item-container`} {...provided.droppableProps} ref={provided.innerRef}>
        <h2>{titleize(type)}</h2>
        {items.map((item, index) => (
          <Draggable key={item.name} draggableId={item.name} index={index}>
            {(provided) => (
              <ItemCard ref={provided.innerRef} draggableProps={{...provided.draggableProps}} dragHandleProps={{...provided.dragHandleProps}} item={item} />
            )}
          </Draggable>
          )
        )}
      </div>
    )}

  </Droppable>
)

export default ItemList;