import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './components/Content';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Register from './components/Register';

export const UserContext = createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const logOutCallback = async () => {
    try {
      await axios.post(
        'http://127.0.0.1:4000/logout',
        {},
        { withCredentials: true }
      );
      setUser({});
    } catch (error) {
      // Handle errors, e.g., set an error state or show an error message
    }
  };

  useEffect(() => {
    async function checkRefreshToken() {
      try {
        const response = await axios.post(
          'http://127.0.0.1:4000/refresh_token',
          {},
          {
            withCredentials: true, // Needed to include the cookie
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setUser({
          accesstoken: response.data.accesstoken,
        });
        console.log(user);
        setLoading(false);
      } catch (error) {
        // Handle errors, e.g., set an error state or show an error message
      }
    }

    checkRefreshToken();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  } else {
    return (
      <>
        <UserContext.Provider value={[user, setUser]}>
          <BrowserRouter>
            <Navigation logOutCallback={logOutCallback} />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Content />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </>
    );
  }
}
export default App;
