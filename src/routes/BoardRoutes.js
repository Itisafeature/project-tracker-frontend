import React from 'react';
import { Route } from 'react-router-dom';
import BoardsIndex from '../boards/BoardsIndex';
import BoardsNew from '../boards/BoardsNew';

const BoardRoutes = () => (
  <>
    <Route exact path="/boards">
      <BoardsIndex />
    </Route>
    <Route exact path="/boards/new">
      <BoardsNew />
    </Route>
  </>
);

export default BoardRoutes;
