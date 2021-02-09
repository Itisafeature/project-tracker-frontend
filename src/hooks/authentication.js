import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthentication = history => {
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   const userData = localStorage.getItem('currentUserPT');

  // }, []);

  const signupUser = () => {};

  const loginUser = res => {
    debugger;
    localStorage.setItem(
      'currentUserPT',
      JSON.stringify({
        hello: 'hello',
      })
    );
    return null;
  };

  const logoutUser = () => {};

  return {
    signupUser,
    loginUser,
  };
};

export default useAuthentication;
