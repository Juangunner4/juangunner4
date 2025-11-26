import React, { useEffect, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
} from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import Navbar from './components/Navbar';
import Career from './pages/Career';
import Football from './pages/Football';
import ContentCreator from './pages/ContentCreator';
import Trading from './pages/Trading';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import { ProfileProvider, useProfile } from './ProfileContext';
import { AuthProvider } from './contexts/AuthContext';
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
  // Solana network - use 'devnet', 'testnet', or 'mainnet-beta'
  const network = 'mainnet-beta';
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Configure supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AuthProvider>
            <ProfileProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Navigate to={getProfileBasePath(false)} replace />} />
                  <Route path="/profile/:profileType/*" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="career" element={<Career />} />
                    <Route path="football" element={<Football />} />
                    <Route path="content-creator" element={<ContentCreator />} />
                    <Route path="trading" element={<Trading />} />
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
          </AuthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
