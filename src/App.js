import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Blog from './pages/Blog';
import PostPage from './pages/PostPage';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post_detail/:postId" element={<PostPage />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;