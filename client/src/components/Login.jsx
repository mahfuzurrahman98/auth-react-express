// Login.js
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add the useHistory hook
import { UserContext } from '../App';

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:4000/login',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true, // Needed to include the cookie
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response.data;

      if (result.accesstoken) {
        setUser({
          accesstoken: result.accesstoken,
        });
        navigate('/');
      } else {
        console.log(result.error);
      }
    } catch (error) {
      // Handle errors, e.g., set an error state or show an error message
    }
  };

  const handleChange = (e) => {
    if (e.currentTarget.name === 'email') {
      setEmail(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <div>Login</div>
        <div className="login-input">
          <input
            value={email}
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            value={password}
            onChange={handleChange}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
