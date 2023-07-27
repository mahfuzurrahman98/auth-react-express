// Profile.js
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Add the Redirect component
import { UserContext } from '../App';

const Profile = () => {
  // Could have something here to check for the time when the accesstoken expires
  // and then call the refresh_token endpoint to get a new accesstoken automatically
  const [user] = useContext(UserContext);
  const [content, setContent] = useState('You need to login');

  useEffect(() => {
    async function fetchProfile() {
      if (!user.accesstoken) return; // Redirect to login if there's no access token
      try {
        const response = await axios.post(
          'http://127.0.0.1:4000/profile',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.accesstoken}`,
            },
          }
        );

        const result = response.data;
        if (result.data) setContent(result.data);
      } catch (error) {
        // Handle errors, e.g., set an error state or show an error message
      }
    }

    fetchProfile();
  }, [user]);

  if (!user.accesstoken) {
    return <Navigate replace to="/login" />;
  }

  return <div>{content}</div>;
};

export default Profile;
