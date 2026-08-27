export default function SearchResultsTable({ data, isLoading, error }) {
  if (error) return <h4 className="text-danger text-center mt-4">{error}</h4>;
  if (isLoading) return <h4 className="text-secondary text-center mt-4">Loading Records...</h4>;
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="table-responsive shadow-sm rounded border">
      <table className="table table-striped table-hover align-middle text-start mb-0">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} className="text-nowrap">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}