import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import HomePage from './components/Homepage/Homepage';
import Feed from './components/Feed/Feed';
import Login from './components/Login/Login';
import UploadPost from './components/UploadPost/upload';

function App() {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1');
        setData(response.data); // Handle success
      } catch (error) {
        console.error('Error fetching data:', error); // Handle error
        setError('Failed to fetch data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="tracking-tight font-thin text-center pt-5 text-3xl">PhotoGram</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <p className="text-center">{data ? JSON.stringify(data) : 'Loading...'}</p>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/upload" element={<UploadPost/>}/>
      </Routes>
    </>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
