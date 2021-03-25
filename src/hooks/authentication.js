import { useEffect } from 'react';
import axios from 'axios';

const useAuthentication = (
  history,
  setIsAuthenticated,
  setIsError,
  setErrorMsg
) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/auth');
        setUserStorage(res);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        console.log(err);
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

  const createOrAuthenticateUser = async (
    form,
    type,
    setIsError,
    setErrorMsg
  ) => {
    const formDataObj = processForm(form);
    try {
      const data = await axios.post(`/${type}`, formDataObj);
      setUserStorage(data);
      setIsAuthenticated(true);
      history.push('/boards');
    } catch (err) {
      setIsAuthenticated(false);
      setIsError(true);
      setErrorMsg(err.response.data.msg);
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
