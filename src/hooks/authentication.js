import { useEffect } from 'react';
import axios from 'axios';

const useAuthentication = (history, setIsAuthenticated) => {
  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('currentUserPT')) {
        try {
          const res = await axios.get('/auth');
          setUserStorage(res);
          setIsAuthenticated(true);
        } catch (err) {
          console.log(err);
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
      setUserStorage(data);
      setIsAuthenticated(true);
      history.push('/boards');
    } catch (err) {
      setIsAuthenticated(false);
      console.log(err);
    }
  };

  const setUserStorage = data => {
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
      setIsAuthenticated(false);
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
