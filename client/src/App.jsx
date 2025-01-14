import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';  // หน้า Login
import Home from './component/Home';    // หน้า Home
import Teacher from './component/Teacher';    // หน้า Home

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Teacher" element={<Teacher />} />
      </Routes>
    </Router>
  );
};

export default App;
