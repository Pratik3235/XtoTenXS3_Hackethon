import { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import '../../styles/UploadCraft.css';

const UploadCraft = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    techniques: '',
    videoUrl: '',
    modelUrl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
      setError('You must be logged in to upload.');
      return;
    }

    try {
      const payload = {
        ...form,
        techniques: form.techniques.split(',').map(t => t.trim()),
        createdBy: user._id,
      };
      await API.post('/crafts', payload);
      setSuccess('Craft uploaded successfully!');
      setForm({ title: '', description: '', techniques: '', videoUrl: '', modelUrl: '' });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload New Craft</h2>
      {error && <p className="upload-error">{error}</p>}
      {success && <p className="upload-success">{success}</p>}
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="techniques"
          placeholder="Techniques (comma-separated)"
          value={form.techniques}
          onChange={handleChange}
        />
        <input
          name="videoUrl"
          placeholder="Video URL (optional)"
          value={form.videoUrl}
          onChange={handleChange}
        />
        <input
          name="modelUrl"
          placeholder="3D Model URL (optional)"
          value={form.modelUrl}
          onChange={handleChange}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadCraft;
