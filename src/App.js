import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import BookNow from './pages/BookNow';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Footer from './components/Footer';
import { ProfileProvider } from './ProfileContext';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booknow" element={<BookNow />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;
