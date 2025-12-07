import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import Layout from './components/Layout';
import HomePage from './pages/home/HomePage';
import PlayPage from './pages/play/PlayPage';
import SearchPage from './pages/search/SearchPage';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play/:id" element={<PlayPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Layout>
      </Router>
    </SettingsProvider>
  );
}

export default App;
