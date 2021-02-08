import React, { useState } from 'react';
import axios from 'axios';
import { titleize } from './helpers/helpers.js';
import RootInformation from './RootInformation';
import './assets/AuthenticationContainer.scss'
import { loginUser } from './utils/authentication';

const AuthenticationContainer = ({type}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // debugger
    try {
      const res = await axios.post(`/${type}`, {
        email,
        username,
        password
      });
      loginUser(res);
    } catch(err) {
      debugger;
    }


  }

  return (
    <div className={`${type}-container`}>
      <RootInformation />
      <div className={`${type}-form-container`}>
        <h1>{titleize(type)} Below</h1>
        <form action={`/${type}`} className={`${type}-form`} method="post" onSubmit={handleSubmit}>
          <input type="text" name="email" className={`${type}-email`} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          {type === 'signup' ? <input type="text" className="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" /> : null}
          <input type="password" name="password" className={`${type}-password`} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button type="submit" className={`${type}-submit`}>{titleize(type)}</button>
        </form>
      </div>
    </div>
  )
}

export default AuthenticationContainer;