import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProjectsPage from './pages/ProjectsPage';
import SoccerPage from './pages/SoccerPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/soccer" component={SoccerPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
