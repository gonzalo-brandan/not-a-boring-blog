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
import MyAccount from './pages/MyAccount'
import MyPosts from './pages/MyPosts'
import Layout from './Layout';
import EditPost from './pages/EditPost'
import ModeratorPanel from './pages/ModeratorPanel'


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Blog />} />
          <Route path="/post_detail/:postId" element={<PostPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/create_post" element={<CreatePost />} />
          <Route path="/user_posts/:username" element={<PostsUser />} />
          <Route path="/posts/:category_name" element={<PostsByCategory />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/edit_post/:postId" element={<EditPost />} />
          <Route path="/moderator_panel" element={<ModeratorPanel />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;