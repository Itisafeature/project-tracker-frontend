import React, { useState } from 'react';
import axios from 'axios';
import { titleize } from './helpers/helpers.js';
import RootInformation from './RootInformation';
import './assets/AuthenticationContainer.scss'

const AuthenticationContainer = ({type}) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const handleSubmit = async (e) => {
   e.preventDefault();
   const res = await axios.post('/users/new', {
     email,
     password
   })
   debugger;
 }

  return (
    <div className={`${type}-container`}>
      <RootInformation />
      <div className={`${type}-form-container`}>
        <h1>{titleize(type)} Below</h1>
        <form action={`/${type}`} className={`${type}-form`} method="post" onSubmit={handleSubmit}>
          <input type="text" name="email" className={`${type}-email`} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <input type="password" name="password" className={`${type}-password`} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button type="submit" className={`${type}-submit`}>{titleize(type)}</button>
        </form>
      </div>
    </div>
  )
}

export default AuthenticationContainer;