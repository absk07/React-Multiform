import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ProtectedRoute from '../routes/ProtectedRoute';
import Profile from '../pages/Profile';
import MultiForm from '../pages/MultiForm';

function App() {
  return (
    <Routes>
      <Route exact="true" path="/register" element={<Register />} />
      <Route exact="true" path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route exact="true" path="/details" element={<MultiForm />} />
        <Route exact="true" path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
