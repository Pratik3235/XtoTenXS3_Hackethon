import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to CraftVerse</h1>
      <p>Your hub for sharing and exploring traditional crafts.</p>

      <div style={styles.buttons}>
        <Link to="/explorer" style={styles.link}>
          <button style={styles.button}>Explore Crafts</button>
        </Link>
        <Link to="/upload" style={styles.link}>
          <button style={styles.button}>Upload Your Craft</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    minHeight: '80vh',
  },
  buttons: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
  },
};

export default Home;
