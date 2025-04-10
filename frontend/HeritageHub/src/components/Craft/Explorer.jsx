import { useEffect, useState } from 'react';
import API from '../../api';
import { Link } from 'react-router-dom';
import '../../styles/Explorer.css'

const Explorer = () => {
  const [crafts, setCrafts] = useState([]);
  const [filteredCrafts, setFilteredCrafts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchCrafts = async () => {
    try {
      const res = await API.get('/crafts');
      setCrafts(res.data);
      setFilteredCrafts(res.data);
    } catch (err) {
      console.error('Error fetching crafts:', err);
    }
  };

  useEffect(() => {
    fetchCrafts();
  }, []);

  useEffect(() => {
    let result = crafts;

    if (search) {
      result = result.filter(craft =>
        craft.title.toLowerCase().includes(search.toLowerCase()) ||
        craft.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(craft =>
        craft.category?.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredCrafts(result);
    setCurrentPage(1);
  }, [search, category, crafts]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCrafts = filteredCrafts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCrafts.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="explorer-container">
      <h2>Explore Crafts</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          <option value="Embroidery">Embroidery</option>
          <option value="Weaving">Weaving</option>
          <option value="Pottery">Pottery</option>
          <option value="Woodwork">Woodwork</option>
        </select>
      </div>

      <div className="craft-grid">
        {currentCrafts.length ? (
          currentCrafts.map((craft) => (
            <Link
              key={craft._id}
              to={`/crafts/${craft._id}`}
              className="craft-link"
            >
              <div className="craft-card">
                <h3>{craft.title}</h3>
                <p>{craft.description}</p>
                <p><strong>Techniques:</strong> {craft.techniques.join(', ')}</p>
                <p><em>By: {craft.createdBy?.name || 'Unknown'}</em></p>
                <p><b>Category:</b> {craft.category || 'N/A'}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No crafts match your search.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Explorer;
