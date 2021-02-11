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

  const createOrAuthenticateUser = async (form, type) => {
    const formDataObj = processForm(form);
    try {
      const data = await axios.post(`/${type}`, formDataObj);
      setUserStorage(data.data);
      history.push('/boards');
    } catch (err) {}
  };

  const setUserStorage = data => {
    debugger;
    localStorage.setItem(
      'currentUserPT',
      JSON.stringify({
        expiration: data.expiration,
        id: data.data.id,
        username: data.data.username,
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
