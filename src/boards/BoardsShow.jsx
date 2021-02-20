import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import ItemsContainer from '../items/ItemsContainer';
import ItemsNew from '../items/ItemsNew';
import '../assets/BoardsShow.scss';

const BoardsShow = () => {
  const history = useHistory();
  const { boardName } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [board, setBoard] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const boardState = history.location.state
    const getBoard = async () => {
      try {
        const data = await axios.get(`/boards/${boardName}`)
        setBoard(data.data.board)
        setItems(data.data.board.items);
      } catch(err) {
        console.log(err.response)
      }
    }
    boardState === undefined ? getBoard() : setBoard(boardState)
    if (board) setItems(board.items);
  }, [boardName, history.location.state])

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const handleNewItem = async (data) => {
    data.boardName = board.name
    try {
      const res = await axios.post('/items', data);
      debugger;
      setItems(items.concat[res.data.item])
    } catch(err) {
      console.log(err.response)
    }
  }

  if (board) {
    return (
      <div className="board-container">
        <div className="board-header">
          <h1 className="board_name">{board.name}</h1>
          <button className="add-item" onClick={toggleForm}>Add Item</button>
        </div>
        {showForm ? <ItemsNew handleNewItem={handleNewItem} /> : null }
        <ItemsContainer items={items} /> 
      </div>
    )
  } else {
    return null
  }
}

export default BoardsShow;