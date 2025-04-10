import { useEffect, useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [crafts, setCrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchUserCrafts = async () => {
    try {
      const res = await API.get(`/crafts?user=${user._id}`);
      setCrafts(res.data);
    } catch (err) {
      console.error('Error fetching crafts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this craft?')) return;
    try {
      await API.delete(`/crafts/${id}`);
      setCrafts(crafts.filter((craft) => craft._id !== id));
    } catch (err) {
      console.error('Failed to delete craft:', err);
    }
  };

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchUserCrafts();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Your Uploaded Crafts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : crafts.length === 0 ? (
        <p>No crafts uploaded yet.</p>
      ) : (
        <div style={styles.grid}>
          {crafts.map((craft) => (
            <div key={craft._id} style={styles.card}>
              <h3>{craft.title}</h3>
              <p>{craft.description}</p>
              <p><strong>Techniques:</strong> {craft.techniques.join(', ')}</p>
              <div style={styles.buttons}>
                <button onClick={() => navigate(`/edit/${craft._id}`)}>Edit</button>
                <button onClick={() => handleDelete(craft._id)} style={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' },
  card: { padding: '1rem', border: '1px solid #ccc', borderRadius: '10px' },
  buttons: { display: 'flex', justifyContent: 'space-between', marginTop: '1rem' },
  deleteBtn: { color: 'white', background: 'red', border: 'none', padding: '0.5rem 1rem' }
};

export default UserDashboard;
