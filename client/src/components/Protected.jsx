// Protected.js
import { useContext, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom'; // Add the Redirect component
import { UserContext } from '../App';

const Protected = () => {
  // Could have something here to check for the time when the accesstoken expires
  // and then call the refresh_token endpoint to get a new accesstoken automatically
  const [user] = useContext(UserContext);
  const [content, setContent] = useState('You need to login');

  useEffect(() => {
    async function fetchProtected() {
      if (!user.accesstoken) return; // Redirect to login if there's no access token
      const result = await (
        await fetch('http://127.0.0.1:4000/protected', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accesstoken}`,
          },
        })
      ).json();
      if (result.data) setContent(result.data);
    }
    fetchProtected();
  }, [user]);

  if (!user.accesstoken) {
    return redirect('/login'); // Redirect to login if there's no access token
  }

  return <div>{content}</div>;
};

export default Protected;
