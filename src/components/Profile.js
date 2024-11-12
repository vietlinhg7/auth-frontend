import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Container, Alert } from 'react-bootstrap';

function Profile() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message || 'Failed to load profile');
        }
      } catch (err) {
        setError('Server error. Please try again later.');
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <Container>
      <h2>Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default Profile;
