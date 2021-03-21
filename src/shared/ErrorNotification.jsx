import React from 'react';
import '../assets/ErrorNotification.scss'


const ErrorNotification = ({msg}) => (
  <div className="error">
    <h3>{msg}</h3>
  </div>
)

export default ErrorNotification;