import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/BoardsIndex.scss'

const BoardsIndex = () => {
  const [boards, setBoards] = useState([{"name": "board1"}, {"name": "board2"}])


  return (
    <div className="boards-container">
      <h1>Here are your Boards!</h1>
      <div>
        {boards.map(b => <h1><Link to={`/boards/${b["name"]}`}>{b["name"]}</Link></h1>)}
      </div>
    </div>
  )
}

export default BoardsIndex;