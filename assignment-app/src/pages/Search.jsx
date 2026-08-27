import SearchMenu from '../components/SearchMenu';
import SearchMetrics from '../components/SearchMetrics';
import SearchResultsTable from '../components/SearchResultsTable';

export default function Search({ searchResults, setSearchResults, isLoading, setIsLoading, error, setError }) {
  
  const handleSearch = async (filterType, keyword) => {
    setIsLoading(true);
    setError(null);
    try {
      let url = '/api/data/search';
      if (keyword.trim() !== '') {
        url += `?filterType=${filterType}&keyword=${encodeURIComponent(keyword)}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data from the server.");
      
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SearchMenu onSearch={handleSearch} isLoading={isLoading} resultCount={searchResults ? searchResults.length : null} />
      <SearchMetrics data={searchResults} />
      <div className="mt-4">
        <SearchResultsTable data={searchResults} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}