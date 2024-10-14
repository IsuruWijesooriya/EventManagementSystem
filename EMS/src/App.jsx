import React from 'react';
import Home from './pages/Home.jsx';
import About from './pages/aboutus.jsx';
import Admin from './pages/adminlogin.jsx';
import Addevent from './pages/addevent.jsx';
import Manageevent from './pages/manageevent.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addevent" element={<Addevent />} />
        <Route path="/manageevent" element={<Manageevent />} />
      </Routes>
    </Router>
  );
}

export default App;
