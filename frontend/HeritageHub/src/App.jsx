import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UploadCraft from './components/Craft/UploadCraft';
import EditCraft from './components/Craft/EditCraft';
import Explorer from './components/Craft/Explorer';
import UserDashboard from './components/Dashboard/UserDashboard';
import Navbar from './components/Navbar';
import UserProfile from './components/Profile/UserProfile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadCraft />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/edit/:id" element={<EditCraft />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
