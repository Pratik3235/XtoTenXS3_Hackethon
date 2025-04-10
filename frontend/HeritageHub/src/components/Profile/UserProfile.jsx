import { useEffect, useState } from 'react';
import API from '../../api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userCrafts, setUserCrafts] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
      fetchUserCrafts(loggedUser._id);
    }
  }, []);

  const fetchUserCrafts = async (userId) => {
    try {
      const res = await API.get(`/crafts?userId=${userId}`);
      setUserCrafts(res.data);
    } catch (err) {
      console.error('Error fetching user crafts:', err);
    }
  };

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div style={styles.container}>
      <h2>{user.name}'s Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>

      <h3 style={{ marginTop: '2rem' }}>Uploaded Crafts</h3>
      {userCrafts.length ? (
        <div style={styles.grid}>
          {userCrafts.map((craft) => (
            <div key={craft._id} style={styles.card}>
              <h4>{craft.title}</h4>
              <p>{craft.description}</p>
              <p><b>Category:</b> {craft.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't uploaded any crafts yet.</p>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '2rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
};

export default UserProfile;
