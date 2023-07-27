// Content.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';

const Content = () => {
  const [user] = useContext(UserContext);

  console.log('token:', user.accesstoken);
  if (!user.accesstoken) {
    // console.log('No token found.');
    return <Navigate replace to="/login" />;
    // window.location.href = '/login';
  }
  return <div>This is the content.</div>;
};

export default Content;
