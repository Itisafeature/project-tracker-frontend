import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import useOnClick from '../hooks/onClick';
import ItemsContainer from '../items/ItemsContainer';
import ItemsNew from '../items/ItemsNew';
import '../assets/BoardsShow.scss';

const BoardsShow = () => {
  const history = useHistory();
  const { boardName } = useParams();
  const itemNewRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [board, setBoard] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const boardState = history.location.state
    const setStates = (board, items) => {
      setBoard(board);
      if (items) setItems(items);
    }
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

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleNewItem = async (data, e) => {
    e.preventDefault();
    data.boardName = board.name
    try {
      const res = await axios.post('/items', data);
      setItems(items.concat([res.data.item]))
      toggleForm();
    } catch(err) {
      console.log(err.response)
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
        {items.length > 0 ? <ItemsContainer items={items} /> : null }
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default BoardsShow;