import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Blog from './pages/Blog';
import PostPage from './pages/PostPage';
import Users from './pages/Users';
import CreatePost from './pages/CreatePost'
import PostsUser from './pages/PostsUser'
import PostsByCategory from './pages/PostsByCategory'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Blog />} />
        <Route path="/post_detail/:postId" element={<PostPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create_post" element={<CreatePost />} />
        <Route path="/user_posts/:username" element={<PostsUser />} />
        <Route path="/posts/:category_name" element={<PostsByCategory />} />
      </Routes>
    </Router>
  );
}

export default App;