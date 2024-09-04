import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import PlaylistsPage from './pages/PlaylistsPage';
import RankerPage from './pages/RankerPage';
import TopsPage from './pages/TopsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tops" element={<TopsPage />} />
        <Route path="/ranker" element={<RankerPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
      </Routes>
    </Router>
  );
}

export default App;