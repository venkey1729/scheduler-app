import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mentor from './pages/Mentor';
import Student from './pages/Student';
import Auth from './components/Auth';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Auth isLogin={false} />} />
          <Route path="/login" element={<Auth isLogin={true} />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
