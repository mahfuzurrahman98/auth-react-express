import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './components/Content';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Protected from './components/Protected';
import Register from './components/Register';

export const UserContext = createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const logOutCallback = async () => {
    await fetch('http://127.0.0.1:4000/logout', {
      method: 'POST',
      credentials: 'include', // Needed to include the cookie
    });
    // Clear user from context
    setUser({});
    // Navigate back to startpage
    // navigate('/'); // This line is no longer needed
  };

  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (
        await fetch('http://127.0.0.1:4000/refresh_token', {
          method: 'POST',
          credentials: 'include', // Needed to include the cookie
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();
      setUser({
        accesstoken: result.accesstoken,
      });
      setLoading(false);
    }
    checkRefreshToken();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Navigation logOutCallback={logOutCallback} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/protected" element={<Protected />} />
          <Route path="/" element={<Content />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
