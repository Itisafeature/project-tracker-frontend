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
  }, [history.location.state])

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const handleNewItem = async (data) => {
    data.boardName = board.name
    try {
      const res = await axios.post('/items', data);
      setItems(items.concat[res.data.item])
      toggleForm();
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
        {items.length > 0 ? <ItemsContainer items={items} /> : null }
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default BoardsShow;