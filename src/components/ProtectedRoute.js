import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage

      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
          }
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data); // Set the user information if the response is successful
        } else {
          setError(data.message || 'Something went wrong');
        }
      } catch (err) {
        setError('Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <Redirect to="/login" />; // Redirect to login if the user is not authenticated
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {/* Display other user information as needed */}
      </div>
    </div>
  );
};

export default Profile;
