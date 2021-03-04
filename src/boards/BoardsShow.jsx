import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
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
  
  const setStates = (board, items) => {
    setBoard(board);
    if (items) {
      setItems(items);
      setIcebox(items.filter(item => item.status === "Icebox").sort((item1, item2) => item1.orderIndex - item2.orderIndex ))
      setNotStarted(items.filter(item => item.status === "Not Started").sort((item1, item2) => item1.orderIndex- item2.orderIndex ))
      setInProgress(items.filter(item => item.status === "In-Progress").sort((item1, item2) => item1.orderIndex - item2.orderIndex ))
      setCompleted(items.filter(item => item.status === "Completed").sort((item1, item2) => item1.orderIndex - item2.orderIndex ))
    }
  }

  const stateFuncMap = {
    'icebox': {
      setter: setIcebox,
      getter: icebox,
      order: 0
    },
    'not_started': {
      setter: setNotStarted,
      getter: notStarted,
      order: 1
    },
    'in_progress': {
      setter: setInProgress,
      getter: inProgress,
      order: 2
    },
    'completed': {
      setter: setCompleted,
      getter: completed,
      order: 3
    }
  }

  useEffect(() => {
    const boardState = history.location.state

    const getBoard = async () => {
      try {
        const data = await axios.get(`/boards/${boardName}`)
        setStates(data.data.board, data.data.items)
      } catch(err) {
        console.log(err.response)
      }
    }

    boardState === undefined ? getBoard() : boardState.items ? setStates(boardState, boardState.items) : setStates(boardState, null)
  }, [boardName, history.location.state])

  useEffect(() => {
    const handleModalOffClick = e => {
      if (e.target && itemNewRef.current && e.target !== itemNewRef.current && !itemNewRef.current.contains(e.target)) {
        toggleForm();
      }
    };
    if (showForm) window.addEventListener("click", handleModalOffClick);
    return () => window.removeEventListener("click", handleModalOffClick)

  }, [showForm])

  useEffect(() => {
    const handleModalOffClick = e => {
      if (e.target && itemCardModalRef.current && e.target !== itemCardModalRef.current && !itemCardModalRef.current.contains(e.target)) {
        toggleItemCardModal();
      }
    };
    if (toggleItemCardModal) window.addEventListener("click", handleModalOffClick);
    return () => window.removeEventListener("click", handleModalOffClick)

  }, [showItemCard])

  useEffect(() => {
    const handleModalOffClick = e => {
      if (e.target && itemNewRef.current && e.target !== itemNewRef.current && !itemNewRef.current.contains(e.target)) {
        toggleForm();
      }
    };
    if (showForm) window.addEventListener("click", handleModalOffClick);
    return () => window.removeEventListener("click", handleModalOffClick)

  }, [showForm])

  const setItemState = (item) => {
    console.log('here')
    setSelectedItem(item);
    toggleItemCardModal();
  }

  const toggleItemCardModal = () => {
    setShowItemCard(!showItemCard);
  }

  const toggleForm = () => {
    setShowForm(!showForm)
  }

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
  
  const reorder = (type, startIndex, endIndex) => {
    const newList = Array.from(stateFuncMap[type].getter); 
    const shiftedElement = newList[endIndex]
    const [movedElement] = newList.splice(startIndex, 1);
    newList.splice(endIndex, 0, movedElement)
    stateFuncMap[type].setter(newList);
    return {movedElement, shiftedElement};
  }

  const move = (sourceType, destinationType, sourceIndex, destinationIndex) => {
    const newSource = Array.from(stateFuncMap[sourceType].getter);
    const newDestination = Array.from(stateFuncMap[destinationType].getter)
    const shiftedElement = (typeof newDestination[destinationIndex] !== 'undefined') ? 
    newDestination[destinationIndex] : newDestination[destinationIndex -1];
    const [movedElement] = newSource.splice(sourceIndex, 1);
    newDestination.splice(destinationIndex, 0, movedElement)
    stateFuncMap[sourceType].setter(newSource);
    stateFuncMap[destinationType].setter(newDestination);
    return {movedElement, shiftedElement}
  }

  const onDragEnd = async ({source, destination}) => {
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const {movedElement, shiftedElement} = reorder(source.droppableId, source.index, destination.index);

      try {
        const res =await axios.patch('/items/updatePositions', {
          sourceItemOrderIndex: movedElement.orderIndex,
          destinationItemOrderIndex: shiftedElement.orderIndex,
          destinationStatus: titleize(destination.droppableId),
          boardName: board.name
        }) // not restful
        const updatedItems = res.data.items
        for (let i=0; i < updatedItems.length; i++) {
          items.find((item) => item.name === updatedItems[i].name).orderIndex = updatedItems[i].orderIndex
        }
      } catch (err) {
  
        console.log(err)
      } 
    } else {
      const { movedElement, shiftedElement } = move(source.droppableId, destination.droppableId, source.index, destination.index)

      try {
        const res = await axios.patch('/items/updatePositions', {
          sourceItemOrderIndex: movedElement.orderIndex,
          destinationItemOrderIndex: shiftedElement.orderIndex - 1,
          destinationStatus: titleize(destination.droppableId),
          boardName: board.name
        }) // not restful

        const updatedItems = res.data.items
        for (let i=0; i < updatedItems.length; i++) {
          items.find((item) => item.name === updatedItems[i].name).orderIndex = updatedItems[i].orderIndex
        }
      } catch (err) {
  
        console.log(err)
      } 
    }
  }

  if (board) {
    return (
      <div className={`board-container ${showForm ? 'modal-active' : ''}`}>
        <div className="board-header">
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
          {items.length > 0 ? <ItemsContainer setItemState={setItemState} icebox={icebox} notStarted={notStarted} inProgress={inProgress} completed={completed} /> : null }
        </DragDropContext>
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default BoardsShow;