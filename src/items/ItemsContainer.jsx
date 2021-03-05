import React from 'react';
import ItemList from './ItemList';
import '../assets/ItemsContainer.scss';

const ItemsContainer = ({toggleItemCardModal, setItemState, icebox, notStarted, inProgress, completed}) => 
  <div className="items-container">
    <ItemList toggleItemCardModal={toggleItemCardModal} setItemState={setItemState} items={icebox} type="icebox" />
    <ItemList toggleItemCardModal={toggleItemCardModal} setItemState={setItemState} items={notStarted} type="not_started" />
    <ItemList toggleItemCardModal={toggleItemCardModal} setItemState={setItemState} items={inProgress} type="in_progress" />
    <ItemList toggleItemCardModal={toggleItemCardModal} setItemState={setItemState} items={completed} type="completed" />
  </div>;


export default ItemsContainer;