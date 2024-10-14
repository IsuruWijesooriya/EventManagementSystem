import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import About from './pages/aboutus.jsx';
import Admin from './pages/adminlogin.jsx';
import Addevent from './pages/addevent.jsx';
import Manageevent from './pages/manageevent.jsx';

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
