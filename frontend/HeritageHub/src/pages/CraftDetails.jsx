import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../api';
import '../styles/CraftDetails.css'; 

const CraftDetails = () => {
  const { id } = useParams();
  const [craft, setCraft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCraft = async () => {
      try {
        const res = await API.get(`/crafts/${id}`);
        setCraft(res.data);
      } catch (err) {
        console.error('Error loading craft details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCraft();
  }, [id]);

  if (loading) return <p>Loading craft details...</p>;
  if (!craft) return <p>Craft not found.</p>;

  return (
    <div className="craft-details-container">
      <Link to="/explorer" className="craft-details-back">← Back to Explorer</Link>
      <h2 className="craft-details-title">{craft.title}</h2>
      <p className="craft-details-info"><strong>Description:</strong> {craft.description}</p>
      <p className="craft-details-info"><strong>Techniques:</strong> {craft.techniques?.join(', ')}</p>
      <p className="craft-details-info"><strong>Category:</strong> {craft.category || 'N/A'}</p>
      <p className="craft-details-info"><strong>Materials:</strong> {craft.materials || 'Not listed'}</p>
      <p className="craft-details-info"><strong>Submitted by:</strong> {craft.createdBy?.name || 'Unknown'}</p>
      <p className="craft-details-info"><strong>Date:</strong> {new Date(craft.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default CraftDetails;
