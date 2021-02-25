import React from 'react';
import ItemList from './ItemList';
import '../assets/ItemsContainer.scss';

const ItemsContainer = ({icebox, notStarted, inProgress, completed}) => 
  <div className="items-container">
    <ItemList items={icebox} type="icebox" />
    <ItemList items={notStarted} type="not_started" />
    <ItemList items={inProgress} type="in_progress" />
    <ItemList items={completed} type="completed" />
  </div>;


export default ItemsContainer;