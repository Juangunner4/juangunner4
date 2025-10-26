import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import BookNow from './pages/BookNow';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Footer from './components/Footer';
import { ProfileProvider, useProfile } from './ProfileContext';
import { getProfileBasePath } from './utils/profileRouting';

const Layout = () => {
  const { profileType } = useParams();
  const { setProfile } = useProfile();

  useEffect(() => {
    setProfile(profileType === 'web3');
  }, [profileType, setProfile]);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={getProfileBasePath(false)} replace />} />
          <Route path="/profile=:profileType" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="booknow" element={<BookNow />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
          </Route>
          <Route path="*" element={<Navigate to={getProfileBasePath(false)} replace />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
