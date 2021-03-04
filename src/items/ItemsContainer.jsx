import React from 'react';
import ItemList from './ItemList';
import '../assets/ItemsContainer.scss';

const ItemsContainer = ({setItemState, icebox, notStarted, inProgress, completed}) => 
  <div className="items-container">
    <ItemList setItemState={setItemState} items={icebox} type="icebox" />
    <ItemList setItemState={setItemState} items={notStarted} type="not_started" />
    <ItemList setItemState={setItemState} items={inProgress} type="in_progress" />
    <ItemList setItemState={setItemState} items={completed} type="completed" />
  </div>;


export default ItemsContainer;