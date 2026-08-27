import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <style>{`
        /* Smooth transitions for specific elements to prevent lag */
        .app-container, nav, .card, .card-header, .list-group-item, 
        .form-control, .form-select, .btn, table, thead, tbody, tr, th, td, hr, h2, h3, h4, h5, p, span, label, a {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }

        /* --- LIGHT MODE (Default) --- */
        .app-container {
          background-color: #f8f9fa;
          color: #212529;
          min-height: 100vh;
        }

        
        nav { 
          background-color: #ece7dd !important; /* Warm earthy taupe/sand */
          border-bottom: 1px solid #ece7dd !important; 
        }

        /* --- DARK MODE OVERRIDES --- */
        [data-theme="dark"] {
          background-color: #121212;
          color: #e0e0e0;
        }
        
        /* Navbar */
        [data-theme="dark"] nav { background-color: #1e1e1e !important; border-bottom: 1px solid #333 !important; }
        [data-theme="dark"] .navbar-brand, [data-theme="dark"] .nav-link { color: #e0e0e0 !important; }
        
        /* Cards & Lists */
        [data-theme="dark"] .card, [data-theme="dark"] .list-group-item { 
          background-color: #1e1e1e !important; 
          color: #e0e0e0 !important; 
          border-color: #333 !important; 
        }
        [data-theme="dark"] .card-header { background-color: #242424 !important; border-bottom-color: #333 !important; }
        
        /* Inputs & Forms */
        [data-theme="dark"] .form-control, [data-theme="dark"] .form-select { 
          background-color: #1e1e1e !important; 
          color: #ffffff !important; 
          border-color: #444 !important; 
        }
        [data-theme="dark"] .form-control::placeholder { color: #9ca3af !important; opacity: 1; }
        
        /* Text & Accents */
        [data-theme="dark"] .text-primary { color: #90caf9 !important; }
        [data-theme="dark"] hr { border-color: #333 !important; }
        [data-theme="dark"] .text-muted { color: #adb5bd !important; } 
        
        /* Buttons */
        [data-theme="dark"] .btn-primary { background-color: #5b769e !important; border-color: #5b769e !important; color: #fff !important; }
        [data-theme="dark"] .btn-outline-primary, [data-theme="dark"] .btn-outline-dark { 
          color: #e0e0e0 !important; border-color: #6c757d !important; 
        }
        [data-theme="dark"] .btn-outline-primary:hover, [data-theme="dark"] .btn-outline-dark:hover { 
          background-color: #6c757d !important; color: #fff !important;
        }

        /* Table */
        [data-theme="dark"] .table-responsive { border-color: #333 !important; }
        [data-theme="dark"] .table { 
          --bs-table-bg: #1e1e1e; 
          --bs-table-color: #e0e0e0; 
          --bs-table-border-color: #333; 
          --bs-table-striped-bg: #242424; 
          --bs-table-striped-color: #e0e0e0; 
          --bs-table-hover-bg: #2c2c2c; 
          --bs-table-hover-color: #ffffff;
        }
        [data-theme="dark"] .table thead th { 
          background-color: #121212 !important; 
          color: #90caf9 !important; 
          border-bottom: 2px solid #333 !important; 
        }
      `}</style>

      <div className="app-container" data-theme={theme}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <div className="container-fluid py-4" style={{ maxWidth: '1400px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/search" 
              element={
                <Search 
                  searchResults={searchResults} setSearchResults={setSearchResults}
                  isLoading={isLoading} setIsLoading={setIsLoading}
                  error={error} setError={setError}
                />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;