import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Web2 from './pages/Web2';
import Web3 from './pages/Web3';
import About from './pages/About';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to my Projects!</h1>} />
            <Route path="/web2" element={<Web2 />} />
            <Route path="/web3" element={<Web3 />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
