import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthentication = history => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('currentUserPT')) {
        try {
          const res = await axios.get('/auth');
          debugger;
          localStorage.setItem();
        } catch (err) {
          console.log(err.response);
        }
      }
    };

    checkAuth();
  }, []);

  const processForm = form => {
    const formData = new FormData(form);
    const formDataObj = {};
    for (const key of formData.keys()) {
      formDataObj[key] = formData.get(key);
    }
    return formDataObj;
  };

  const createOrAuthenticateUser = async (form, type) => {
    const formDataObj = processForm(form);
    try {
      const data = await axios.post(`/${type}`, formDataObj);
      setUserStorage(data.data);
      history.push('/boards');
    } catch (err) {
      console.log(err.response);
    }
  };

  const setUserStorage = data => {
    debugger;
    localStorage.setItem(
      'currentUserPT',
      JSON.stringify({
        username: data.data.user.username,
        email: data.data.user.email,
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
    createOrAuthenticateUser,
    logoutUser,
  };
};

export default useAuthentication;
