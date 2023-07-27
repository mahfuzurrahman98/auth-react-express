import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ logOutCallback }) => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/profile">Profile</Link>
    </li>
    <li>
      <Link to="/login">Login</Link>
    </li>
    <li>
      <Link to="/register">Register</Link>
    </li>
    <li>
      <button onClick={logOutCallback}>Log Out</button>
    </li>
  </ul>
);

export default Navigation;
