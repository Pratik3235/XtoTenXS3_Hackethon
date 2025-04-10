import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import '../../styles/EditCraft.css';

const EditCraft = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [craft, setCraft] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    techniques: '',
  });

  const getCraft = async () => {
    try {
      const res = await API.get(`/crafts/${id}`);
      setCraft(res.data);
      setForm({
        title: res.data.title,
        description: res.data.description,
        techniques: res.data.techniques.join(', ')
      });
    } catch (err) {
      console.error('Error fetching craft:', err);
    }
  };

  useEffect(() => {
    getCraft();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      techniques: form.techniques.split(',').map(t => t.trim())
    };

    try {
      await API.put(`/crafts/${id}`, payload);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating craft:', err);
    }
  };

  if (!craft) return <p>Loading...</p>;

  return (
    <div className="edit-container">
      <h2>Edit Craft</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Craft Title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Craft Description"
          required
        />
        <input
          type="text"
          name="techniques"
          value={form.techniques}
          onChange={handleChange}
          placeholder="Techniques (comma-separated)"
          required
        />
        <button type="submit">Update Craft</button>
      </form>
    </div>
  );
};

export default EditCraft;
