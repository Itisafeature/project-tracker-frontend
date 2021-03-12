import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import useModal from '../hooks/modal';
import { titleize } from '../helpers/helpers';
import ItemsContainer from '../items/ItemsContainer';
import ItemCardModal from '../items/ItemCardModal';
import ItemsNew from '../items/ItemsNew';
import '../assets/BoardsShow.scss';

const BoardsShow = () => {
  const history = useHistory();
  const { boardName } = useParams();
  const itemNewRef = useRef();
  const itemCardModalRef = useRef();
  const [board, setBoard] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showItemCard, setShowItemCard] = useState(false);
  const [icebox, setIcebox] = useState([]);
  const [notStarted, setNotStarted] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]); 

  const sortByOrderIndex = (coll) => coll.sort((el1, el2) => el1.orderIndex - el2.orderIndex)
  
  const setStates = (board, items) => {
    setBoard(board);
    if (items) {
      setItems(items);
      setIcebox(sortByOrderIndex(items.filter(item => item.status === "Icebox")));
      setNotStarted(sortByOrderIndex(items.filter(item => item.status === "Not Started")));
      setInProgress(sortByOrderIndex(items.filter(item => item.status === "In-Progress")));
      setCompleted(sortByOrderIndex(items.filter(item => item.status === "Completed")));
    }
  }

  useEffect(() => {
    if (icebox && notStarted && inProgress && completed) {
      const newItems = icebox.concat(notStarted, inProgress, completed)
      newItems.forEach((item, index) => item.orderIndex = index)
      setItems(sortByOrderIndex(newItems))
    }
  }, [icebox, notStarted, inProgress, completed])



  const stateFuncMap = {
    'icebox': {
      setter: setIcebox,
      getter: icebox,
      status: 'Icebox',
      order: 0
    },
    'not_started': {
      setter: setNotStarted,
      getter: notStarted,
      status: 'Not Started',
      order: 1
    },
    'in_progress': {
      setter: setInProgress,
      getter: inProgress,
      status: 'In-Progress',
      order: 2
    },
    'completed': {
      setter: setCompleted,
      getter: completed,
      status: 'Completed',
      order: 3
    }
  }

  useEffect(() => {
    const boardState = history.location.state

    const getBoard = async () => {
      try {
        const data = await axios.get(`/boards/${boardName}`)
        setStates(data.data.board, sortByOrderIndex(data.data.board.items))
      } catch(err) {
        console.log(err.response)
      }
    }

    boardState === undefined ? getBoard() : boardState.items ? setStates(boardState, sortByOrderIndex(boardState.items)) : setStates(boardState, null)
  }, [boardName, history.location.state])

  const setItemState = (item) => {
    setSelectedItem(item);
    toggleItemCardModal();
  }

  const toggleItemCardModal = () => {
    setShowItemCard(!showItemCard);
  }

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleItemNewClick = (e) => {
    if (
      e.target && itemNewRef.current && e.target !== itemNewRef.current && !itemNewRef.current.contains(e.target)
    ) toggleForm();
  }

  const handleItemCardModalClick = e => {
    if (
      e.target && itemCardModalRef.current && e.target !== itemCardModalRef.current && !itemCardModalRef.current.contains(e.target)
    ) setItemState('')
  }

  useModal(handleItemNewClick, showForm)
  useModal(handleItemCardModalClick, showItemCard);


  const handleNewItem = async (data, e) => {
    e.preventDefault();
    data.boardName = board.name
    try {
      const res = await axios.post('/items', data);
      setStates(board, items.concat([res.data.item]))
      toggleForm();
    } catch(err) {
      console.log(err.response)
    }
  }

  const handleSaveOrder = async () => {
    await axios.patch('/items/updatePositions', {
      boardName: board.name,
      items
    })
  }
  
  const reorder = (type, startIndex, endIndex) => {
    const newList = Array.from(stateFuncMap[type].getter); 
    const [movedElement] = newList.splice(startIndex, 1);
    newList.splice(endIndex, 0, movedElement)

    stateFuncMap[type].setter(newList);
  }


  const move = async (sourceType, destinationType, sourceIndex, destinationIndex) => {
    const newSource = Array.from(stateFuncMap[sourceType].getter);
    const newDestination = Array.from(stateFuncMap[destinationType].getter)
    const [movedElement] = newSource.splice(sourceIndex, 1);
    newDestination.splice(destinationIndex, 0, movedElement);

    movedElement.status = stateFuncMap[destinationType].status

    stateFuncMap[sourceType].setter(newSource);
    stateFuncMap[destinationType].setter(newDestination);
  }

  const onDragEnd = async (result) => {
    const {source, destination} = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      reorder(source.droppableId, source.index, destination.index);
    } else {
      move(source.droppableId, destination.droppableId, source.index, destination.index);
    }
  }

  if (board) {
    return (
      <div className={`board-container ${showForm ? 'modal-active' : ''}`}>
        <div className="board-header">
          <button className="save-order" onClick={handleSaveOrder}>Save Item Order</button>
          <h1 className="board_name">{board.name}</h1>
          <button className="add-item" onClick={toggleForm}>Add Item</button>
        </div>
        <div ref={itemNewRef}>
          {showForm ? <ItemsNew handleNewItem={handleNewItem} /> : null }
        </div>
        <div ref={itemCardModalRef}>
          {showItemCard ? <ItemCardModal item={selectedItem} /> : null}
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          {items.length > 0 ? <ItemsContainer toggleItemCardModal={toggleItemCardModal} setItemState={setItemState} icebox={icebox} notStarted={notStarted} inProgress={inProgress} completed={completed} /> : null }
        </DragDropContext>
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default BoardsShow;