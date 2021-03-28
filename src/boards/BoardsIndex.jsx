import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { errorHelper } from '../helpers/helpers';
import '../assets/BoardsIndex.scss'
import ErrorNotification from '../shared/ErrorNotification';
import Loading from '../shared/Loading';

const BoardsIndex = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false); 
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getBoards = async () => {
      try {
        const data = await axios.get('/boards');
        setBoards(data.data.boards);
      } catch(err) {
        setIsError(true);
        setErrorMsg(errorHelper(err.response.data));
      }      
      setIsLoading(false);
    }
    getBoards();
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {isError && <ErrorNotification msg={errorMsg} />}
      <div className="boards-container">
        <h1>Here are your Boards!</h1>
        <div>
          {boards.length > 0 && boards.map((b, i) => <h1 key={i}><Link to={`/boards/${b["name"]}`}>{b["name"]}</Link></h1>)}
          {boards.length === 0 && <h3>You have no boards!</h3>}
        </div>
      </div>
    </>
  )
}

export default BoardsIndex;