import React from 'react';
import { Route } from 'react-router-dom';
import BoardsIndex from '../boards/BoardsIndex';
import BoardsNew from '../boards/BoardsNew';
import BoardsShow from '../boards/BoardsShow';

const BoardRoutes = () => (
  <>
    <Route exact path="/boards">
      <BoardsIndex />
    </Route>
    <Route exact path="/boards/new">
      <BoardsNew />
    </Route>
    <Route exact path="/boards/:boardName">
      <BoardsShow />
    </Route>
  </>
);

export default BoardRoutes;
