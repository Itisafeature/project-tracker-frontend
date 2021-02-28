import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { titleize } from '../helpers/helpers';
import ItemCard from './ItemCard';
import '../assets/ItemList.scss';


const ItemList = ({items, type}) => (
  <div className="items-list-container">
    <h2 style={{display: 'inline-block'}}>{titleize(type)}</h2>
    <Droppable droppableId={`${type}`}>
      {(provided) => (
        <div className={`${type}-items`} {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => (
            <Draggable key={item.name} draggableId={item.name} index={index}>
              {(provided) => (
                <ItemCard ref={provided.innerRef} draggableProps={{...provided.draggableProps}} dragHandleProps={{...provided.dragHandleProps}} item={item} />
              )}
            </Draggable>
            )
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
)

export default ItemList;