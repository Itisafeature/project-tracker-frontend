import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const BoardsShow = () => {
  const history = useHistory();
  const { boardName } = useParams();
  const [loading, setLoading] = useState(true);
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

    if (board && board.length === 0) {
      history.push('/boards');
    }
  }, [])

  return (
    <h1>{board && <h1>board.name</h1>}</h1>
  )
}

export default BoardsShow;