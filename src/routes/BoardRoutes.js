import React from 'react';
import { Route } from 'react-router-dom';
import BoardsIndex from './BoardsIndex';

const BoardRoutes = () => (
  <>
    <Route path="/boards">
      <BoardsIndex />
    </Route>
  </>
);

export default BoardRoutes;
