import React from 'react';
import ItemCard from './ItemCard';
import '../assets/ItemsContainer.scss';

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
      <div className="icebox-item-container">
        <h2>Icebox</h2>
        {icebox.map(item => <ItemCard key={item.name} item={item} />)}
      </div>
      <div className="not_started-item-container">
        <h2>Not Started</h2>
        {notStarted.map(item => <ItemCard key={item.name} item={item} />)}
      </div>
      <div className="in_progress-item-container">
        <h2>In-Progress</h2> 
        {inProgress.map(item => <ItemCard key={item.name} item={item} />)}
      </div>  
      <div className="completed-item-container">
        <h2>Completed</h2>
        {completed.map(item => <ItemCard key={item.name} item={item} />)}
      </div>  
    </div>
  )
}

export default ItemsContainer;