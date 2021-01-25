import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    <div className="login-container">
      <form action="/login" className="login-form" method="post">
        <input type="text" name="email" className="login-email"/>
        <input type="text" name="password" className="login-password"/>
        <button type="submit" className="login-submit">Login</button>
      </form>
    </div>
  )
}

export default Login;