import React from 'react';
import { titleize } from './helpers/helpers.js';
import RootInformation from './RootInformation';
import './assets/AuthenticationContainer.scss'

const AuthenticationContainer = ({type}) => {
  return (
    <div className={`${type}-container`}>
      <RootInformation />
      <div className={`${type}-form-container`}>
        <h1>{titleize(type)} Below</h1>
        <form action={`/${type}`} className={`${type}-form`} method="post">
          <input type="text" name="email" className={`${type}-email`}/>
          <input type="text" name="password" className={`${type}-password`}/>
          <button type="submit" className={`${type}-submit`}>{type}</button>
        </form>
      </div>
    </div>
  )
}

export default AuthenticationContainer;