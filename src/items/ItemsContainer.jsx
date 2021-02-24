import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ItemCard from './ItemCard';
import '../assets/ItemsContainer.scss';
import ItemList from './ItemList';

const ItemsContainer = ({items}) => {
  const [icebox, notStarted, inProgress, completed] =                            
    items.reduce((result, item) => {
      result[
        item.status === 'Icebox' ? 0 :
        item.status === 'Not Started' ? 1 :
        item.status === 'In-Progress' ? 2 :
        item.status === 'Completed' ? 3 : null
      ].push(item);
      return result;
    },
    [[], [], [], []]);         
    
  return (
    <div className="items-container">
      <ItemList items={icebox} type="icebox" />
      <ItemList items={notStarted} type="not_started" />
      <ItemList items={inProgress} type="in_progress" />
      <ItemList items={completed} type="completed" />
    </div>
  )
}

export default ItemsContainer;