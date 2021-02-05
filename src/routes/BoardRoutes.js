import React from 'react';
import { Route } from 'react-router-dom';
import BoardsIndex from '../BoardsIndex';

const BoardRoutes = () => (
  <>
    <Route exact path="/boards">
      <BoardsIndex />
    </Route>
  </>
);

export default BoardRoutes;
