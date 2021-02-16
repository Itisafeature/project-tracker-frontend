import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const BoardsShow = () => {
  const history = useHistory();
  const { boardName } = useParams();
  const [board, setBoard] = useState(null);
  const [error, setError] = useState(false);


  useEffect(() => {
    const getBoard = async () => {
      try {
        const data = await axios.get(`/boards/${boardName}`)
        console.log(data)
      } catch(err) {
        console.log(err.response)
      }
    }
    getBoard();
  }, [])

  return (
    <h1>Hello World</h1>
  )
}

export default BoardsShow;