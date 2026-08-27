import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchMenu({ onSearch, isLoading, resultCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterType, setFilterType] = useState('all'); 
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const queryKeyword = searchParams.get('keyword');
    if (queryKeyword) {
      setKeyword(queryKeyword);
      setFilterType('all'); 
      onSearch('all', queryKeyword); 
      setSearchParams({});
    }
  }, [searchParams]);

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch(filterType, keyword);
  };

  return (
   
    <div className="row mb-4">
      <div className="col-12 col-md-8 col-lg-6 text-start">
        <h3 className="mb-4 fw-bold">Search Menu</h3>
        <form onSubmit={submitSearch} className="mb-3">
          
          <div className="mb-3">
            <label className="form-label fw-bold">Keyword:</label>
            <input 
              type="text" 
              className="form-control" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} 
              placeholder="Enter search term..." 
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Filter By:</label>
            <select 
              className="form-select" 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Fields</option>
              <option value="gender">Gender</option>
              <option value="operatingSystem">Operating System</option>
              <option value="model">Model</option>
              <option value="behaviorclass">Behavior Class</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-sm" disabled={isLoading}>
            Search
          </button>
        </form>

        <div className="mt-3 fw-bold text-muted">
          {isLoading ? (
            <span>Loading...</span>
          ) : resultCount === 0 ? (
            <span>No Records To Display</span>
          ) : resultCount !== null ? (
            <span>Displaying {resultCount.toLocaleString('en-US')} Records</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}