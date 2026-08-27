export default function SearchMetrics({ data }) {
  if (!data || data.length === 0) return null;

  const calculateStats = (key) => {
    const values = data.map(item => Number(item[key])).filter(n => !isNaN(n)).sort((a, b) => a - b);
    if (values.length === 0) return { avg: 0, median: 0 };
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const mid = Math.floor(values.length / 2);
    const median = values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
    return { avg: Number(avg.toFixed(2)).toLocaleString('en-US'), median: Number(median.toFixed(2)).toLocaleString('en-US') };
  };

  return (
    <div className="row g-3 mb-4">
      <MetricCard title="App Usage Time" avg={calculateStats("App Usage Time (min/day)").avg} median={calculateStats("App Usage Time (min/day)").median} unit="Minutes" />
      <MetricCard title="Screen On Time" avg={calculateStats("Screen On Time (hours/day)").avg} median={calculateStats("Screen On Time (hours/day)").median} unit="Hours" />
      <MetricCard title="Apps Installed" avg={calculateStats("Number of Apps Installed").avg} median={calculateStats("Number of Apps Installed").median} unit="Apps" />
      <MetricCard title="Age" avg={calculateStats("Age").avg} median={calculateStats("Age").median} unit="Years" />
    </div>
  );
}

function MetricCard({ title, avg, median, unit }) {
  return (
    <div className="col-md-3">
      <div className="card text-center shadow-sm h-100">
        <div className="card-header fw-bold">{title}</div>
        <div className="card-body py-4">
          <h5 className="card-title mb-3 text-primary">{avg} <small className="fs-6 text-muted">{unit}</small></h5>
          <p className="card-text mb-0 small"><strong>Median:</strong> {median} {unit}</p>
        </div>
      </div>
    </div>
  );
}