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
import Projects from './pages/Projects';
import Home from './pages/Home';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import { ProfileProvider, useProfile } from './ProfileContext';
import { getProfileBasePath } from './utils/profileRouting';
import TradingPlatform from './pages/TradingPlatform';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';

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
      <AdBanner />
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
          <Route path="/profile/:profileType/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path=":platformId" element={<TradingPlatform />} />
          </Route>
          <Route path="*" element={<Navigate to={getProfileBasePath(false)} replace />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
