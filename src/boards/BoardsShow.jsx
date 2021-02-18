import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

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
      <div>
        {board.name}
      </div>
    )
  } else {
    return null
  }
}

export default BoardsShow;