import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ theme, toggleTheme }) {
  const [navKeyword, setNavKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === '/search';

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navKeyword.trim() !== '') {
      navigate(`/search?keyword=${encodeURIComponent(navKeyword)}`);
      setNavKeyword('');
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg sticky-top shadow-sm ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="container-fluid px-4 position-relative">
        
        <style>{`
          @media (min-width: 992px) {
            .center-search {
              position: absolute !important;
              left: 50%;
              transform: translateX(-50%);
              z-index: 10;
            }
          }
        `}</style>

        <div className="d-flex align-items-center">
        
          <Link className="navbar-brand fw-bold" to="/">User Behavior Data</Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row align-items-center">
            <li className="nav-item">
              <button 
                onClick={toggleTheme} 
                className={`btn btn-sm d-flex align-items-center fw-bold shadow-sm ${theme === 'light' ? 'btn-dark text-white' : 'btn-light text-dark'}`}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </div>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          {!isSearchPage && (
            <>
              <form className="d-flex mx-auto w-100 center-search my-3 my-lg-0" style={{ maxWidth: '500px' }} onSubmit={handleNavSearch}>
                <input 
                  className="form-control me-2" 
                  type="search" 
                  placeholder="Quick search (e.g. Pixel, Android, Male, 5)..." 
                  value={navKeyword}
                  onChange={(e) => setNavKeyword(e.target.value)}
                />
                <button className="btn btn-primary px-4 shadow-sm" type="submit">Search</button>
              </form>

              <div className="d-flex ms-auto mt-2 mt-lg-0">
                
                <Link className="btn btn-primary text-nowrap shadow-sm" to="/search">Search Through Dataset</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}