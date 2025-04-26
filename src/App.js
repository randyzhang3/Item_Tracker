import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import UrlInputPage from './UrlInputPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/track" element={<UrlInputPage />} />
      </Routes>
    </Router>
  );
}

export default App;
