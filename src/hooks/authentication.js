import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthentication = history => {
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   const userData = localStorage.getItem('currentUserPT');

  // }, []);

  const processForm = form => {
    const formData = new FormData(form);
    const formDataObj = {};
    for (const key of formData.keys()) {
      formDataObj[key] = formData.get(key);
    }
    return formDataObj;
  };

  const signupUser = async form => {
    const formDataObj = processForm(form);
    try {
      const data = await axios.post('/signup', formDataObj);
      setUserStorage(data.data);
    } catch (err) {}
  };

  const loginUser = async form => {
    const formDataObj = processForm(form);
    try {
      const data = await axios.post('/login', formDataObj);
      setUserStorage(data.data);
    } catch (err) {}
  };

  const setUserStorage = data => {
    debugger;
    localStorage.setItem(
      'currentUserPT',
      JSON.stringify({
        hello: 'hello',
      })
    );
    return null;
  };

  const logoutUser = async () => {
    try {
      await axios.post('/logout');
      localStorage.removeItem('currentUserPT');
    } catch (err) {
      console.log(err);
    }
  };

  return {
    signupUser,
    loginUser,
    logoutUser,
  };
};

export default useAuthentication;
