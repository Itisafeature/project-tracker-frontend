import React, { useState } from 'react';

const BoardsIndex = () => {
  const [boards, setBoards] = useState([{"name": "board1"}, {"name": "board2"}])


  return (
    <div>
      {boards.map(b => `<h1>${b["name"]}</h1>`)}
    </div>
  )
}

export default BoardsIndex;