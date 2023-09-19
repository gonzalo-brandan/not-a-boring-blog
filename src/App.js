import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Registration from './Auth/Registration';
import Blog from './components/Blog';
import PostPage from './components/PostPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/n" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;