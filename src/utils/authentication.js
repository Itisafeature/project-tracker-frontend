import React from 'react';
import { Redirect } from 'react-router-dom';

export const loginUser = res => {
  localStorage.setItem('currentUser', JSON.stringify(res.data.data.user));
  // return history.push('/boards');
};
export const logoutUser = () => {};
