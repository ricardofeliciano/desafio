import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/manage/admin';
import PostList from './pages/manage/posts/PostList';
import PublicPosts from './pages/portal/blog/PublicPosts';
import Login from './pages/manage/login/Login';
import PrivateRoute from './components/security/PrivateRoute';
import PostDetail from './pages/portal/blog/Details';
import Category from './pages/manage/admin/category/category';
import Categorylist from './pages/manage/admin/category/list';
import Tag from './pages/manage/admin/tag/Tag';
import Taglist from './pages/manage/admin/tag/list';
import EditCategory from './pages/manage/admin/category/edit';
import EditTag from './pages/manage/admin/tag/edit';
import EditAdmin from './pages/manage/admin/edit';
import { AuthProvider } from './components/services/AuthContext';
import Register from './pages/manage/login/register';

import './index.css';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<PublicPosts />} />      
          
        <Route path="/details/:id" element={<PostDetail />} />      
            
        <Route path="/admin/login" element={<Login />} />      
        <Route path="/admin/register" element={<Register />} />      
        <Route
          path="/admin/"
          element={
            <PrivateRoute element={<Admin />} />
            
          }
        />
        <Route
          path="/admin/article/edit/:id"
          element={
            <PrivateRoute element={<EditAdmin />} />
            
          }
        />
        <Route
          path="/admin/postlist/"
          element={
            <PrivateRoute element={<PostList />} />
            
          }
        />
         <Route
          path="/admin/category"
          element={
            <PrivateRoute element={<Category />} />
            
          }
        />
         <Route
          path="/admin/edit/category/:id"
          element={
            <PrivateRoute element={<EditCategory />} />
            
          }
        />
          <Route
          path="/admin/category/list"
          element={
            <PrivateRoute element={<Categorylist />} />
            
          }
        />
          <Route
          path="/admin/tag"
          element={
            <PrivateRoute element={<Tag />} />
            
          }
        />
         <Route
          path="/admin/edit/tag/:id"
          element={
            <PrivateRoute element={<EditTag />} />
            
          }
        />
           <Route
          path="/admin/tag/list"
          element={
            <PrivateRoute element={<Taglist />} />
            
          }
        />
      </Routes>
    </Router>
    </AuthProvider>
  </React.StrictMode>
);
