import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import ItemsContainer from '../items/ItemsContainer';
import '../assets/BoardsShow.scss';

const BoardsShow = () => {
  const history = useHistory();
  const { boardName } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [board, setBoard] = useState(null);
  const [error, setError] = useState(false);



  useEffect(() => {
    const boardState = history.location.state
    const getBoard = async () => {
      try {
        const data = await axios.get(`/boards/${boardName}`)
        setBoard(data.data.board)
      } catch(err) {
        console.log(err.response)
      }
    }

    if (boardState === undefined) {
      getBoard();
    } else {
      setBoard(boardState)
    }
  
  }, [boardName, history.location.state])

  if (board) {
    return (
      <div className="board-container">
        <div className="board-header">
          <button className="add-item pseudo">Add Item</button>
          <h1 className="board_name">{board.name}</h1>
          <button className="add-item">Add Item</button>
        </div>
        <ItemsContainer items={board.items} />
      </div>
    )
  } else {
    return null
  }
}

export default BoardsShow;